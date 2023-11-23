import dotenv from 'dotenv';

dotenv.config();
export const DB_STATUS = {
    ACTIVE: 1,
    PENDING: 2,
    SUSPENDED: 10,
    BLOCKED: 100
}
export const EMISSION_MODES = {
    BIKE: "BIKE",
    CAR: "CAR",
    FLIGHT: "FLIGHT",
    TRAIN: "TRAIN",
    METRO: "METRO",
    WALK: "WALK"
}

export const BIKE_MODES = {
    ELECTRIC: "ELECTRIC",
    BICYCLE: "BICYCLE",
    GASOLINE: "GASOLINE"
}

export const BIKE_OWNERSHIP = {
    OWNED: 'OWNED',
    RENTED: 'RENTED'
}

export const LOGIN_TYPE = {
    EMAIL: 1,
    ALI_PAY: 2,
}

export const JWT_LIFETIME = process.env.JWT_LIFETIME // seconds 
export const JWT_SECRET = process.env.JWT_SECRET ?? ''


export default {
    DB_STATUS, LOGIN_TYPE, JWT_LIFETIME, JWT_SECRET,
    EMISSION_MODES
}