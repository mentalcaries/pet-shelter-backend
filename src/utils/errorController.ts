import { NextFunction, Response } from 'express';
const AppError = require('./appError');

const sendProdError = (res: Response, err: typeof AppError) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const sendDevError = (res: Response, err: typeof AppError) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (
  err: typeof AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(res, err);
  } else if (process.env.NODE_ENV === 'production') {
    sendProdError(res, err);
  }
};
