import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors';
import { ApiResponse } from '../types';

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(new AppError(`Route ${req.method} ${req.path} not found`, 404));
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    res.status(400).json({
      success: false,
      message: 'Database operation failed',
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
