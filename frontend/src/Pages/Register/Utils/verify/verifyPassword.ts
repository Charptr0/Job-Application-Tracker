import { ERR_TYPE } from "../types/error_types";

export function verifyPassword(password: string | undefined): ERR_TYPE | null {
    if (!password || password.length === 0) return ERR_TYPE.NO_PASSWORD;
    if (password.length < 8) return ERR_TYPE.INVALID_PASSWORD;

    return null;
}