import {apiRoot} from "./apiRoot";
import { CreateUserInterface } from '../models/entities';
// @ts-expect-error get-browser-fingerprint is not typed
import getBrowserFingerprint from "get-browser-fingerprint"

const deviceHash = getBrowserFingerprint({ enableWebgl: true }).toString()

export const getUserAll = async (adminToken: string) => {
    try {
        const response = await fetch(`${apiRoot}/user/all`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_refresh");
            } else {
                throw new Error("error_unknown");
            }
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const changePassword = async (adminToken: string, username: string, newPassword: string) => {
    try {
        const response = await fetch(`${apiRoot}/user/${username}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
                "Content-Type": "application/json",
                "device-hash": deviceHash
            },
            body: JSON.stringify({newPassword}),
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_refresh");
            } else {
                throw new Error("error_unknown");
            }
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteUserById = async (adminToken: string, id: number) => {
    try {
        const response = await fetch(`${apiRoot}/user/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_refresh");
            } else {
                throw new Error("error_unknown");
            }
        }

        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const checkUserExists = async (username: string) => {
    try {
        const response = await fetch(`${apiRoot}/user/check/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_refresh");
            } else {
                throw new Error("error_unknown");
            }
        }

        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const createUser = async (adminToken: string, newUser: CreateUserInterface) => {
    try {
        const response = await fetch(`${apiRoot}/user`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_refresh");
            } else {
                throw new Error("error_unknown");
            }
        }

        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}