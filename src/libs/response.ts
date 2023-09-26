import { type Response } from "express";
import _ from "lodash";

import Logger from "../providers/logger";

const response = ({
    res,
    data,
    error,
}: {
    res: Response;
    data?: any;
    error?: any;
}): Response => {
    let success = _.get(data, "success", true);
    let message = _.get(data, "message", "");

    if (error instanceof Error) {
        message = _.get(error, "message", "serverError");

        success = false;

        if (res.statusCode === 200) {
            res.status(400);
        }
    }

    Logger.info(`RESPONSE IS ------------> ${message}`);

    const responsePayload = {
        ...data,
        success,
        message,
    };

    return res.json(responsePayload);
};

export default response;
