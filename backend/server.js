import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';
import express from 'express';
import mongoose from 'mongoose';

import productRoutes from './routes/productRoutes.js';

//startup
dotenv.config();
connectDB();
const app = express();
app.use('/api/products', productRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
