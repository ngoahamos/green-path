import { Schema } from "mongoose";
import IUser from "./iuser.interface";

export default interface IEmission {
    user: string | Schema.Types.ObjectId | IUser;
    quantity: number;
    date: Date;
    mode: string;
    distance: string;
    from_location: string;
    to_location: string;
    status: number;
    created_at: Date;
    updated_at: Date;
}