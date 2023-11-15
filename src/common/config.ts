import dotenv from 'dotenv';

dotenv.config();
export const DB_STATUS = {
    ACTIVE: 1,
    PENDING: 2,
    SUSPENDED: 10,
    BLOCKED: 100
}

export const LOGIN_TYPE = {
    EMAIL: 1,
    ALI_PAY: 2,
}

export const JWT_LIFETIME = process.env.JWT_LIFETIME // seconds 
export const JWT_SECRET = process.env.JWT_SECRET ?? ''
console.log('env', process.env.JWT_SECRET)
console.log('env--', process.env.DB)

export default {
    DB_STATUS, LOGIN_TYPE, JWT_LIFETIME, JWT_SECRET
}