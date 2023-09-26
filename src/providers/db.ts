import mongoose from "mongoose";

import { DatabaseUrl } from "../env";
import Logger from "./logger";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(DatabaseUrl, {
            dbName: "mongo_session",
        });

        Logger.info(`MongoDB Connected: ${connection.connection.host}`);

        mongoose.set("debug", function (coll, method, query, doc) {
            console.log(
                `Mongoose: ${coll}.${method} ${JSON.stringify(
                    query
                )} ${JSON.stringify(doc)}`
            );
        });
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
