import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { connectDB } from "./providers/db";
import Express from "./providers/express";
import Logger from "./providers/logger";
import Server from "./providers/server";

dayjs.extend(timezone);
dayjs.extend(utc);

const StartServer = (): void => {
    const express = Express();

    express.initializeApp();
    express.configureViews();
    const app = express.app;

    const httpServer = Server(app);
    httpServer.start();

    void connectDB();
};

StartServer();

process.on("uncaughtException", (err) => {
    Logger.error(err);
    process.exit(1);
});

process.on("SIGTERM", async () => {
    Logger.debug("SIGTERM signal received: closing HTTP server");
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    Logger.error(err);
    process.exit(1);
});
