import express from 'express';
const router = express.Router();

import {
  getProducts,
  getProductById,
  getTopProducts,
} from '../controllers/productController.js';

router.route('/').get(getProducts);

router.route('/top').get(getTopProducts);

router.route('/:id').get(getProductById);

export default router;
