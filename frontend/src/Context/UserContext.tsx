import React, { createContext, useState } from "react";

interface IUserState {
    id: string;
    username: string;
    email: string;
}

interface IUserContext {
    currentUser: IUserState | null,
    updateUser: Function,
}

export const UserContext = createContext<IUserContext | null>(null);

export function UserProvider({ children }: any) {
    const [user, setUser] = useState<IUserState | null>(null);

    return <UserContext.Provider value={{ currentUser: user, updateUser: setUser }}>
        {children}
    </UserContext.Provider>
}