import { type NextFunction, type Request, type Response } from "express";
import _ from "lodash";
import { type AnyZodObject, type ZodEffects } from "zod";

import response from "../libs/response";

const requestValidator =
    (schema: ZodEffects<AnyZodObject> | AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body.parsedData = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (error) {
            console.log(
                "------------------------------------------------------------"
            );
            console.log("Error while validating the request...");
            console.log(JSON.stringify(error, null, 2));
            console.log(
                "------------------------------------------------------------"
            );

            const responseData = {
                success: false,
                message: _.get(error, "issues[0].message", ""),
            };
            res.status(400);
            return response({
                res,
                data: responseData,
            });
        }
    };

export default requestValidator;
