import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

export default router;

// @ desc Fetch all products
// @ route GET /api/products
// @ access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); //gets all products
    res.json(products);
  })
);

// @ desc Fetch a single product
// @ route GET /api/products/:id
// @ access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.find({ _id: req.params.id });
    product.length > 1
      ? res.json(product)
      : res.status(404).json({ message: 'Product not found' });
  })
);
