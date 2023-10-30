import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    const message = "Oops. Our addressing system got confuse.";

    return response.status(404).send({ message });
};