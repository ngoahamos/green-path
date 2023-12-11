import { Request, Response } from "express";
import { EMISSION_MODES } from "../common/config"
import emissionModel from "../models/emission.model";



const daily_average = async(req: Request, res: Response) => {
    const modes:any = EMISSION_MODES;
    const result = [];
    for(let mode in modes) {
        const queryResult = await emissionModel.aggregate([
            {
                $match: {
                    mode: modes[mode]
                }
            },
            {
                $group: {
                    _id: null,
                    average_quantity: {$avg: 'quantity'}
                    
                }
            }
        ]);

        result.push({
            mode: modes[mode],
            quantity: queryResult[0].average_quantity
        })
    }

    return res.send(result);
}

export default {
    daily_average
}