import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { env } from '../config/env';
import { ConflictError, UnauthorizedError } from '../utils/errors';
import { RegisterInput, LoginInput } from '../validations/auth.validation';
import { AuthResponse, JwtPayload, UserResponse } from '../types';

const SALT_ROUNDS = 12;

const formatUserResponse = (user: { id: string; email: string; createdAt: Date; updatedAt: Date }): UserResponse => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const generateToken = (payload: JwtPayload): string => {
  const options: jwt.SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new ConflictError('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
    },
  });

  const token = generateToken({ userId: user.id, email: user.email });

  return {
    user: formatUserResponse(user),
    token,
  };
};

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = generateToken({ userId: user.id, email: user.email });

  return {
    user: formatUserResponse(user),
    token,
  };
};

export const getProfile = async (userId: string): Promise<UserResponse> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  return formatUserResponse(user);
};
