import { type UserTypes } from "./types";

export interface UserDetailsJWT {
    userType: UserTypes | "";
    email: string;
    id: string;
}
