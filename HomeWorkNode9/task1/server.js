import express from 'express'
import bcrypt from 'bcrypt'
import { sequelize } from './db.js'
import { User } from './user.js'
import jwt from 'jsonwebtoken';

const app = express()
app.use(express.json())

//ЗАДАЧА 1
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body ?? {}
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })

    const exists = await User.findOne({ where: { email } })
    if (exists) return res.status(409).json({ error: 'Email already registered' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, passwordHash }) 

    res.status(201).json({ id: user.id, email: user.email })
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already registered' })
    }
    console.error('REGISTER_ERROR:', e)
    res.status(500).json({ error: 'Registration failed' })
  }
})

//ЗАДАЧА 2
function checkMustChangePasswordForLogin(req, res, next) {
  if (req.user?.mustChangePassword) {
    return res.status(403).json({ error: 'Must change password', mustChangePassword: true })
  }
  next()
}

app.post('/login',
  async (req, res, next) => {
    try {
      const { email, password } = req.body ?? {}
      if (!email || !password) return res.status(400).json({ error: 'email and password required' })

      const user = await User.findOne({ where: { email } })
      if (!user) return res.status(401).json({ error: 'Invalid credentials' })

      const ok = await bcrypt.compare(password, user.passwordHash)
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

      req.user = user
      next()
    } catch (e) {
      console.error('LOGIN_ERROR:', e)
      res.status(500).json({ error: 'Login failed' })
    }
  },
  checkMustChangePasswordForLogin,
(req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: req.user.id, email: req.user.email, role: req.user.role } })
  }
)
app.post('/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body ?? {}
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'email, currentPassword and newPassword required' })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const ok = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid current password' })

    const passwordHash = await bcrypt.hash(newPassword, 10)
    await user.update({ passwordHash, mustChangePassword: false })

    res.json({ ok: true })
  } catch (e) {
    console.error('CHANGE_PASSWORD_ERROR:', e)
    res.status(500).json({ error: 'Change password failed' })
  }
})

//ЗАДАЧА 3
function auth(req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
    if (!token) return res.status(401).json({ error: 'No token' })
    const payload = jwt.verify(token, process.env.JWT_SECRET)
   
    User.findByPk(payload.id).then(user => {
      if (!user) return res.status(401).json({ error: 'Invalid token' })
      req.user = user
      next()
    }).catch(() => res.status(401).json({ error: 'Unauthorized' }))
  } catch {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}


app.post('/delete-account', auth, async (req, res) => {
  try {
    const { currentPassword } = req.body ?? {}
    if (!currentPassword) return res.status(400).json({ error: 'currentPassword required' })

    const ok = await bcrypt.compare(currentPassword, req.user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid password' })

    await req.user.destroy()
    res.json({ ok: true })
  } catch (e) {
    console.error('DELETE_ACCOUNT_ERROR:', e)
    res.status(500).json({ error: 'Delete failed' })
  }
})

//ЗАДАЧА 4

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) return res.status(403).json({ error: 'Forbidden' })
    next()
  }
}

app.get('/admin', auth, requireRole('admin'), (req, res) => {
  res.json({ secret: 'admin-only data' })
})


//ЗАДАЧА5

app.post('/change-email', auth, async (req, res) => {
  try {
    const { newEmail, currentPassword } = req.body ?? {};
    if (!newEmail || !currentPassword) {
      return res.status(400).json({ error: 'newEmail and currentPassword required' });
    }

    const ok = await bcrypt.compare(currentPassword, req.user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid password' });

   
    if (newEmail === req.user.email) {
      return res.json({ ok: true, email: req.user.email });
    }

    
    const exists = await User.findOne({ where: { email: newEmail } });
    if (exists) return res.status(409).json({ error: 'Email already registered' });

   
    await req.user.update({ email: newEmail });

    res.json({ ok: true, email: req.user.email });
  } catch (e) {

    if (e.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Invalid email' });
    }
    res.status(500).json({ error: 'Change email failed' });
  }
})

await sequelize.sync({ alter: true })
app.listen(process.env.PORT ?? 3000, () => {
  console.log(`API running on http://localhost:${process.env.PORT ?? 3000}`)
});