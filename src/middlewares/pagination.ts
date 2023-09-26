import { type NextFunction, type Request, type Response } from "express";

import response from "../libs/response";
import { isNumeric } from "../utils";
import { type PaginationSortingDetails } from "../utils/types";

const pagination = (req: Request, res: Response, next: NextFunction) => {
    try {
        let { page, pageSize, sortBy, sortDirection, query } = req.query;

        if (!sortBy) {
            sortBy = "createdAt";
        }
        if (!sortDirection) {
            sortDirection = "desc";
        }
        if (!page || !isNumeric(+page) || +page < 1) {
            page = "1";
        }
        if (!pageSize || !isNumeric(+pageSize) || +pageSize < 1) {
            pageSize = "10";
        }

        console.log({
            page,
            pageSize,
            sortBy,
            sortDirection,
            query,
        });

        if (!isNumeric(page) || !isNumeric(pageSize)) {
            throw new Error("serverError");
        }
        if (sortDirection !== "asc" && sortDirection !== "desc") {
            throw new Error("");
        }

        const parsedPage = parseInt(page as string, 10);
        const parsedPageSize = parseInt(pageSize as string, 10);

        const pagination: PaginationSortingDetails = {
            page: parsedPage,
            pageSize: parsedPageSize,
            sortBy: sortBy as string,
            sortDirection,
            query: query as string,
        };

        req.body.pagination = pagination;

        next();
    } catch (e) {
        return response({
            res,
            error: e,
        });
    }
};

export default pagination;
