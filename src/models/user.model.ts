import mongoose, {model, Schema} from "mongoose";
import Joi from '@hapi/joi';
import mongoosePaginate from 'mongoose-paginate-v2';
import IUser from "../interfaces/iuser.interface";
import { DB_STATUS, LOGIN_TYPE } from "../common/config";

const PASSWORD_LENGTH = 6;

const user_schema = new Schema<IUser>({
    name: {type: String, default: 'Anonymous'},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String },
    status: {type: Number, default: DB_STATUS.PENDING},
    is_email_verified: {type: Boolean, default: false},
    avatar: {type: String},
    login_type: {type: Number, default: LOGIN_TYPE.EMAIL},
    email_verified_at: {type: Date},
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

});

user_schema.plugin(mongoosePaginate)

export const validateUser = (user: any) => {
    const schema = Joi.object({
        status: Joi.number(), // this is to ignore the error
        name: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(PASSWORD_LENGTH),
        avatar: Joi.string()
    })

    return schema.validate(user);
}

export default model<IUser, mongoose.PaginateModel<IUser>>('users', user_schema);
