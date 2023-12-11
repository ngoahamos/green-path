import { Request, Response } from "express";
import { EMISSION_MODES, DAY_OF_WEEK } from "../common/config"
import emissionModel from "../models/emission.model";
import { parseDateToEndOfDay, parseDateToStartOfDay } from "../utils/date.helper";



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
                    _id: "$mode",
                    average_quantity: {$avg: '$quantity'}
                    
                }
            }
        ]);
        console.log(queryResult);
        const resultObj = {
            mode: modes[mode],
            quantity: 0,
        }
        
        if (queryResult[0]) {
            resultObj.quantity = queryResult[0].average_quantity ?? 0;
            resultObj.quantity = +Number(resultObj.quantity).toFixed(2);
        }

        result.push(resultObj)
    }

    return res.send(result);
}

const weekly_analytics = async(req: Request, res: Response) => {
    const body = req.body;
    const mode = body.mode;
    const start_date = parseDateToStartOfDay(body.start_date);
    const end_date = parseDateToEndOfDay(body.end_date);

    const results: any[] = [];
    
     const queryResult = await emissionModel.aggregate([
        {
            $match: {
                mode: mode,
                date: {
                    $gte: start_date,
                    $lte: end_date
                  }
            }
        },
        {
            $group: {
                _id: { $dayOfWeek: '$date' },
                total_quantity: { $sum: '$quantity' }
                
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]);


    // this object may not have all the days
    queryResult.forEach((val) => {
        results.push({day: DAY_OF_WEEK[val._id], quantity: val.total_quantity})
    });



    return res.send(results);
}

export default {
    daily_average, weekly_analytics
}