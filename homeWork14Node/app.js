import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;

const app=express();
app.use(express.json());

if(!MONGO_URL){
    console.error('MONGO_URL not set');
      process.exit(1);
}


app.get('/',(req ,res)=>{
    res.send('Home page');
});

app.post('/categories', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: '`name` is required' });

  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/products', async (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price == null || !category) {
    return res.status(400).json({ error: '`name`, `price`, `category` are required' });
  }

  try {
    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/products', async (_req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });