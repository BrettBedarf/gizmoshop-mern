const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); //send to custom error middleware
};

const handleError = (err, req, res, next) => {
  //sometimes can get 200 response code even though it's an error
  //replace with 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  //doesn't need to call next() because response already sent
};

export { notFound, handleError };
