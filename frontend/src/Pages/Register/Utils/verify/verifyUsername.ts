import { ERR_TYPE } from "../types/error_types";

export function verifyUsername(username: string | undefined): ERR_TYPE | null {
    if (!username || username.length === 0) return ERR_TYPE.NO_USERNAME;

    if (username.length <= 3) return ERR_TYPE.USERNAME_TOO_SHORT;

    return null;
}
