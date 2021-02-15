import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = (req, res, next) => {
  //token will be sent through headers
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Only pass decoded id and make one db call in controller for single
      // responsibility
      req.decodedToken = decoded;
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized: bad token');
    }
  } else if (!token) {
    res.status(401);
    throw new Error('Not Authorized: No token in headers');
  }
  next();
};

const admin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.decodedToken.id);
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
});

export { protect, admin };
