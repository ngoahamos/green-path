import dotenv from 'dotenv';

dotenv.config();
export const DB_STATUS = {
    ACTIVE: 1,
    PENDING: 2,
    SUSPENDED: 10,
    BLOCKED: 100
}
export const EMISSION_MODES: any = {
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

export const DAY_OF_WEEK:any = {
    SUNDAY: "Sunday",
    MONDAY: "Monday",
    TUESDAY: "Tuesday",
    WEDNESDAY: "Wednesday",
    THURSDAY: "Thursday",
    FRIDAY: "Friday",
    SATURDAY: "Saturday",
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday"
}

export const DAYS = [
    "Sunday",
     "Monday",
    "Tuesday",
    "Wednesday",
   "Thursday",
    "Friday",
    "Saturday",
]

export const JWT_LIFETIME = process.env.JWT_LIFETIME // seconds 
export const JWT_SECRET = process.env.JWT_SECRET ?? ''


export default {
    DB_STATUS, LOGIN_TYPE, JWT_LIFETIME, JWT_SECRET,
    EMISSION_MODES, DAY_OF_WEEK,DAYS
}