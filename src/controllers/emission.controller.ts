import { Request, Response } from "express";
import IBikePayload from "../interfaces/ibike_payload.interface";
import { calculate_car_carbon_emissions, calculate_carbon_emissions_from_walking, calculate_riding_time_distance_and_emissions } from "../utils/emissions.helper";
import Emission, { validateBike, validateCar, validateWalking } from "../models/emission.model";
import { EMISSION_MODES } from "../common/config";
import IWalkPayload from "../interfaces/iwalk_payload.interface";
import ICarPayload from "../interfaces/icar_payload";

const log_bike_emission = (req: Request, res: Response) => {
    const body = req.body as IBikePayload;

    const { error } = validateBike(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    if (!body.date) {
        body.date = new Date();
    }
    const result = calculate_riding_time_distance_and_emissions(body.mode, body.riding_time);

    Emission.create({
        date: body.date,
        mode: EMISSION_MODES.BIKE,
        quantity: result.emission,
        user: req.user?._id,
        distance: result.distance
    });

    return res.status(200).send({message: `Estimated emission for this ride is ${result.emission} kg CO2`})
}

const log_walking_emission = (req: Request, res: Response) => {
    const body = req.body as IWalkPayload;

    const { error } = validateWalking(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    if (!body.date) {
        body.date = new Date();
    }
    const result = calculate_carbon_emissions_from_walking(body.time, body.distance);

    Emission.create({
        date: body.date,
        mode: EMISSION_MODES.WALK,
        quantity: result,
        user: req.user?._id,
        distance: body.distance
    });

    return res.status(200).send({message: `Estimated emission for this walk is ${result} kg CO2`})
}

const log_car_emission = (req: Request, res: Response) => {
    const body = req.body as ICarPayload;

    const { error } = validateCar(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    if (!body.date) {
        body.date = new Date();
    }
    const result = calculate_car_carbon_emissions(body.distance,body.fuel_type, body.fuel_consumption);

    Emission.create({
        date: body.date,
        mode: EMISSION_MODES.CAR,
        quantity: result,
        user: req.user?._id,
        distance: body.distance
    });

    return res.status(200).send({message: `Estimated emission for driving ${body.distance}km is ${result} kg CO2`})
}

export default {
    log_bike_emission, log_walking_emission, log_car_emission
}