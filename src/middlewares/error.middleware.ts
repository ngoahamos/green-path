import HttpException from "../common/http-exception.common";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
  error: Error | HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error instanceof HttpException ? error.statusCode || error.status || 500 : 500;
  logger.info("about to die ");
  logger.error(error?.message);
  return response.status(status).send({
    message: "We are unable to process your request now and this is entirely our fault. "
  });
};
