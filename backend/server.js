import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';
import express from 'express';
import mongoose from 'mongoose';

//startup
dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API Loading');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const matchingProduct = products.find((p) => p._id === req.params.id);
  res.json(matchingProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
