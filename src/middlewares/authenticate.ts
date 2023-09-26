import { type NextFunction, type Request, type Response } from "express";

import { GetExistingAdmin } from "../app/services/Admin.service";
import { GetExistingBrandUser } from "../app/services/BrandUser.service";
import { GetExistingPos } from "../app/services/Pos.service";
import response from "../libs/response";
import { parseJwt } from "../utils/jwt";
import { type UserDetailsJWT } from "../utils/jwtTypes";
import { UserTypes } from "../utils/types";

const authenticate =
    (allowed: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new Error("error.jwt_token.notFound");
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                throw new Error("error.jwt_token.notFound");
            }

            const decodedTokenData = parseJwt(token) as UserDetailsJWT;
            console.log({
                decodedTokenData,
            });

            if (!allowed.includes(decodedTokenData.userType)) {
                res.status(403);
                throw new Error("error.jwt_token.unauthorized");
            }

            switch (decodedTokenData.userType) {
                case UserTypes.Admin:
                    await handleAdmin(decodedTokenData);
                    break;
                case UserTypes.PoS:
                    await handlePos(decodedTokenData);
                    break;
                case UserTypes.Brand:
                    await handleBrandUser(decodedTokenData);
                    break;
                default:
                    throw new Error("error.jwt_token.invalid");
            }

            req.body.user = decodedTokenData;

            next();
        } catch (e) {
            res.status(401);
            return response({
                res,
                error: e,
            });
        }
    };

export default authenticate;

const handleAdmin = async (decodedTokenData: UserDetailsJWT) => {
    return await GetExistingAdmin({
        args: {
            where: {
                id: decodedTokenData.id,
            },
        },
    });
};

const handlePos = async (decodedTokenData: UserDetailsJWT) => {
    return await GetExistingPos({
        args: {
            where: {
                id: decodedTokenData.id,
                isVerified: true,
            },
        },
    });
};

const handleBrandUser = async (decodedTokenData: UserDetailsJWT) => {
    return await GetExistingBrandUser({
        args: {
            where: {
                id: decodedTokenData.id,
            },
        },
    });
};
