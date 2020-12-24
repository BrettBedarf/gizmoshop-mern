import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

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
    const reqId = req.params.id;
    if (mongoose.Types.ObjectId.isValid(reqId)) {
      const product = await Product.findById({ _id: reqId });
      //product found if it has an id
      if (product.id) {
        res.json(product);
      } else {
        res.status(404);
        throw new Error('Product not found');
      }
    } else {
      res.status(404);
      throw new Error('Not a valid Product id');
    }
  })
);
