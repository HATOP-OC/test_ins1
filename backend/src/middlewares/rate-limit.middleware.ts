import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 5, 
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, 
  limit: 100, 
  message: {
    success: false,
    message: 'Too many requests. Please slow down.',
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
