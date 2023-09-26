import bcrypt from "bcrypt";

export const encryptPassword = async (
    plainPassword: string
): Promise<string> => {
    return await bcrypt.hash(plainPassword, 10);
};

export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
) => {
    return plainPassword && hashedPassword
        ? await bcrypt.compare(plainPassword, hashedPassword)
        : false;
};
