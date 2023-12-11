import { RequestHandler, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User, {validateUser} from '../models/user.model';
import IUser from "../interfaces/iuser.interface";
import config, { DB_STATUS } from "../common/config";
import { logger } from "../utils/logger";

const register: RequestHandler = async (req: Request, res: Response) => {
    const body = req.body as IUser;

    // TODO: change this to pending to allow email verification later
    body.status = DB_STATUS.ACTIVE;

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // let's check for unique name;
    const exitingUser = await User.findOne({email: body.email});

    if (exitingUser)
        return res.status(400).send({message: 'Sorry! you cannot register with this email.'});

    body.password = await bcrypt.hash(body.password, 10)    

    const user = new User({
        ...body
    });
    await user.save();

    // let's make sure we are not sending what the user doesn't need
    const cleanUser = await User.findById(user._id).select('-password');
    logger.info(cleanUser?.password);
   
    return res.status(201).send(cleanUser)
};

const login: RequestHandler = async (req: Request, res: Response) => {
    const request_body = req.headers["authorization"] || '';

    if (!request_body) return res.status(403).send({message: 'Invalid email or password.'}) // let's try not give anyone ideas

    const auth = Buffer.from(request_body, "base64")
        .toString()
        .split(":");
   
    const email = auth[0];
    const password = auth[1];

    if (!email || !password) return res.status(403).send({message: 'Invalid email or password.'})

    try {
        const user = await User.findOne<IUser>({email});
        if (!user) return res.status(403).send({ error: "Your credentials didn't match our record." });

        if (user.status == DB_STATUS.BLOCKED)
            return res.status(403).send({ error: "Your account has been blocked" });

        if (user.status == DB_STATUS.SUSPENDED)
            return res.status(403).send({ error: "Your account has been suspended" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(403).json({ error: "Your credentials didn't match our record." });
   
        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
            expiresIn: config.JWT_LIFETIME,
            
        });

        const _user = await User.findOne({email}).select('-password')

        return res.send({user: _user, token, expiresIn: config.JWT_LIFETIME});
    } catch (err: any) {
        logger.error(err);
        logger.error(err?.message)
       return res.status(400).send({ message: 'Error Occured while attemting to login'});
    }
};

export default {
    register, login
}