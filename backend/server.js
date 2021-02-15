import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, handleError } from './middleware/errorMiddleware.js';

//startup
dotenv.config();
connectDB();
const app = express();

// Middleware to be able to use json
app.use(express.json());

// Attach api routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // Any route that's not listed above, default to index.html in static folder
  app.get('*', (req, res) =>
    res.sendFile([path.resolve(__dirname, 'frontend', 'build', 'index.html')])
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode..');
  });
}

//handle 404
app.use(notFound);
//error middleware
app.use(handleError);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
