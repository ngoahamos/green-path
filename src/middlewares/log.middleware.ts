import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const mid_log = async(
  request: Request,
  response: Response,
  next: NextFunction
) => {
    logger.info("=== REQUEST PAYLOAD === ");
    logger.info(request.originalUrl);
    logger.debug(request.body);
    logger.info("=== REQUEST PARAMS ===");
    logger.debug(request.params);
    logger.info("=== REQUEST QUERY ===");
    logger.debug(request.query);

    next();  

};