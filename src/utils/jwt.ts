import jwt, { type JwtPayload } from "jsonwebtoken";

import { JwtSecretKey } from "../env";

export const signJwt = (
    payload: string | object | Buffer,
    jwtOptions?: jwt.SignOptions
) => {
    try {
        return jwt.sign(payload, JwtSecretKey, jwtOptions);
    } catch (error) {
        throw new Error("serverError");
    }
};

export const parseJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, JwtSecretKey);
        return decoded as JwtPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("error.jwt_token.expired");
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("error.jwt_token.invalid");
        } else {
            throw new Error("error.jwt_token.exception");
        }
    }
};
