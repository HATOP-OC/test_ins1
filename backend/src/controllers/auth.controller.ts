import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { AuthenticatedRequest, ApiResponse, AuthResponse, UserResponse } from '../types';

export const register = async (
  req: Request,
  res: Response<ApiResponse<AuthResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: 'Registration successful',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response<ApiResponse<AuthResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await authService.login(req.body);
    res.json({
      success: true,
      data: result,
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<UserResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await authService.getProfile(req.user!.userId);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
