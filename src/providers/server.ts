import { type Application } from "express";
import http from "http";

import { ApiPrefix, Host, Port } from "../env";
import Logger from "./logger";

const Server = (
    app: Application
): {
    start: () => void;
} => {
    const server = http.createServer(app);

    /**
     *  Runs the HTTP server
     */
    const start = (): void => {
        server.listen(Port);
        Logger.info(`Server is running at ${Host}${ApiPrefix}`);
        Logger.info(`Server is listening on port ${Port}...`);

        server.on("error", onError);
    };

    /**
     * Event listener for HTTP server "error" event.
     */
    const onError = async (error: any): Promise<never> => {
        if (error.syscall !== "listen") {
            throw error;
        }

        const bind = "Pipe " + Port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                Logger.error(bind + " requires elevated privileges");
                process.exit(1);
                break;

            case "EADDRINUSE":
                Logger.error(bind + " is already in use");
                process.exit(1);
                break;

            default:
                throw error;
        }
    };

    return {
        start,
    };
};

export default Server;
