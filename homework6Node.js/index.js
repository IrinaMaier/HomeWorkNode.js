import express from 'express';
import db from './db.js';


const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  try {
    res.send('Hello, World!');
  } catch (error) {
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Поле name обязательно' });
  }

  res.json({ message: `Привет, ${name}!` });
});


app.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении продуктов' });
  }
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Укажите name и price' });
  }
 try {
    await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    res.json({ message: 'Продукт успешно добавлен' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении продукта' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});