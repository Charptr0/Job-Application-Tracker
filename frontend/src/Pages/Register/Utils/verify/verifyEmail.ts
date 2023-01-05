import { ERR_TYPE } from "../types/error_types";

export function verifyEmail(email: string | undefined): ERR_TYPE | null {
    // no email provided
    if (!email || email.length === 0) return ERR_TYPE.INVALID_EMAIL;

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // email is invalid
    if (!email.match(emailRegex)) return ERR_TYPE.INVALID_EMAIL;

    return null;
}