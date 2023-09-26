import { type Request, type Response } from "express";
import mongoose from "mongoose";

export const Controller = {
    async cleanDatabase(req: Request, res: Response) {
        for (const collection in mongoose.connection.collections) {
            try {
                await mongoose.connection.collections[collection].drop();
            } catch (error) {
                console.error(
                    `Error while dropping collection ${collection}: ${error}`
                );
            }
        }

        return res.json({
            message: "Database cleaned.",
        });
    },
};
