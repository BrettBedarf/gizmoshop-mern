import express from 'express';
const router = express.Router();

import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

export default router;

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);
