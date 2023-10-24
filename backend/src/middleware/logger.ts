import { Request, Response, NextFunction } from 'express';

/**
 * A middleware function that logs the request time
 * @param req The request object
 * @param res The response object
 * @param next The function to be called after this middleware function
 */
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request received at:', new Date().toISOString());
  next();
};

export default logger;
