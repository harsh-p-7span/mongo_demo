import { type NextFunction, type Request, type Response } from "express";
import multerInstance from "multer";

import response from "./response";

export const filterXlsxFiles = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        req.file &&
        req.file.mimetype ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        next();
    } else {
        res.status(400);
        return response({
            res,
            error: new Error("error.upload.invalidXlsxFile"),
        });
    }
};

const storage = multerInstance.memoryStorage();
const multer = multerInstance({
    storage,
});

export default multer;
