import morgan, { type StreamOptions } from "morgan";

import Logger from "../providers/logger";

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
};

const morganMiddleware = morgan(
    ":http-version :method :url :status - :response-time ms - :date",
    {
        stream,
    }
);

export default morganMiddleware;
