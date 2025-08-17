import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, username: "user", 
   email: "user@ex.com",  
   password: bcrypt.hashSync("123456", 10), 
   role: "user"  },

  { id: 2, username: "admin", 
    email: "admin@ex.com", 
    password: bcrypt.hashSync("123456", 10), 
    role: "admin" },
];


const signToken = (user) =>
  jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const findUserById = (id) => users.find((u) => u.id === Number(id));

function authenticateJWT(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Authorization header missing or invalid" });

  const token = auth.split(" ")[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") return res.status(401).json({ error: "Token expired" });
    return res.status(401).json({ error: "Invalid token" });
  }
}


const authorizeRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) return res.status(403).json({ error: "Forbidden: insufficient role" });
  next();
};


app.post("/login", async (req, res) => {
  const { login, password } = req.body; 
  if (!login || !password) return res.status(400).json({ error: "login and password are required" });

  const user = users.find((u) => u.username === login) || users.find((u) => u.email === login);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken(user);
  res.json({ message: "Logged in", token, user: { id: user.id, role: user.role, email: user.email } });
});


app.get("/me", authenticateJWT, (req, res) => {
  const user = findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
});


//ЗАДАНИЕ 1

app.get("/", (req, res) => res.send("OK"));

app.put("/update-email", authenticateJWT, (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "email is required" });

  const user = findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.email = email;
  res.json({
    message: "Email updated",
    user: { id: user.id, username: user.username, email: user.email, role: user.role },
  });
});

//ЗАДАНИЕ 2

app.delete("/delete-account", authenticateJWT, (req, res) => {
  const idx = users.findIndex((u) => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ error: "User not found" });

  const deleted = users[idx];
  users.splice(idx, 1);

  res.json({ message: "Account deleted", 
    deletedId: deleted.id });
});

//ЗАДАНИЕ 3

app.put("/update-role", authenticateJWT, authorizeRole("admin"), (req, res) => {
  const { userId, role } = req.body;
  if (!userId || !role) return res.status(400).json({ error: "userId and role are required" });

  const user = findUserById(userId);
  if (!user) return res.status(404).json({ error: "Target user not found" });

  user.role = role;
  res.json({
    message: "Role updated",
    user: { id: user.id, username: user.username, email: user.email, role: user.role },
  });
});

//ЗАДАНИЕ 4

app.post("/refresh-token", authenticateJWT, (req, res) => {
  const user = findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const newToken = signToken(user);
  res.json({ message: "Token refreshed", token: newToken });
});




app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));