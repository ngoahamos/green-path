import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import config from "../common/config";
import IUser from "../interfaces/iuser.interface";


export const auth = async(
  request: Request,
  response: Response,
  next: NextFunction
) => {
    const token = request.header('x-api-key');
    if (!token) 
      return response.status(401).send({message: 'Access denied. No key provided.'});

      jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) return response.status(401).json({ message: "Invalid token" });
        
        request.user = decoded as IUser;
        next();
    });

 

};