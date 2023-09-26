import winston from "winston";

import { NodeEnv } from "../env";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({
        format: "DD-MMM-YYYY hh:mm:ss A",
    }),
    winston.format.colorize({
        all: true,
    }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const devTransports = [new winston.transports.Console()];

const prodTransports = [
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
    }),
    new winston.transports.File({
        filename: "logs/all.log",
    }),
];

const Logger = winston.createLogger({
    level: "debug",
    levels,
    format,
    transports:
        NodeEnv === "development"
            ? devTransports
            : [...devTransports, ...prodTransports],
});

export default Logger;
