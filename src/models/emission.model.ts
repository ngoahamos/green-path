import mongoose, { model, Schema } from "mongoose";
import Joi from '@hapi/joi';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DB_STATUS } from "../common/config";
import IEmission from "../interfaces/iemission.interface";

const emission_schema = new Schema<IEmission>({
    mode: { type: String, required: true },
    date: { type: Date, required: true },
    quantity: { type: Number, default: 0 },
    status: { type: Number, default: DB_STATUS.ACTIVE },
    from_location: {type: String},
    to_location: {type: String},
    distance: {type: String },
    user: { type: Schema.Types.ObjectId, ref: "users" }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

});

emission_schema.plugin(mongoosePaginate)

export const validateEmission = (emission: any) => {
    const schema = Joi.object({
        mode: Joi.string(), // this is to ignore the error
        date: Joi.date().required(),
    })

    return schema.validate(emission);
}

export default model<IEmission, mongoose.PaginateModel<IEmission>>('emissions', emission_schema);
