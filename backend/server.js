const express = require('express');
const products = require('./data/products.js');

const app = express();

app.get('/', (req, res) => {
	res.send('API Loading');
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

app.get('/api/products/:id', (req, res) => {
	const matchingProduct = products.find(p => p._id === req.params.id);
	res.json(matchingProduct);
});

app.listen(5000, console.log('Server running on port 5000'));
