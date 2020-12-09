<<<<<<< HEAD
import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';

//startup
dotenv.config();
connectDB();
=======
const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products.js');

dotenv.config();

>>>>>>> 14a387ca7011928f261fba8a37fee4292ecbb90c
const app = express();

app.get('/', (req, res) => {
	res.send('API Loading');
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	const matchingProduct = find(p => p._id === req.params.id);
	res.json(matchingProduct);
});

const port = process.env.PORT || 5000;
app.listen(
	port,
	console.log(
<<<<<<< HEAD
		`Server running in ${process.env.NODE_ENV} mode on port ${port}`
=======
		`Server running in ${process.env.NODE_ENV} mode on ports ${port}`
>>>>>>> 14a387ca7011928f261fba8a37fee4292ecbb90c
	)
);
