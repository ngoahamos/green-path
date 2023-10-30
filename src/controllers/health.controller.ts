import { Request, Response, NextFunction, RequestHandler } from "express";
import * as requestIp from 'request-ip';



const welcome: RequestHandler = async (req: Request, res: Response) => {
    return res.send({
        status: 'running',
        serverTime: new Date(),
    });
};

const serverHealth: RequestHandler = (req: Request, res: Response) => {
   
    return res.send({
        status: 'running',
        serverTime: new Date(),
        env: process.env.ENV,
        health: process.env.HEALTH,
        ip: requestIp.getClientIp(req)
      });
};


export default {
    welcome,
    serverHealth
}