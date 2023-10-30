import winston, {format} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
require("winston-daily-rotate-file");

const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "green-path-api";

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: "logs/log-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
  });

export const logger = winston.createLogger({
    level: "debug",
    format: combine(label({label: CATEGORY}), timestamp(), prettyPrint()),
    transports: [
        fileRotateTransport,
        new winston.transports.Console(),
    ]
})

export default {logger}