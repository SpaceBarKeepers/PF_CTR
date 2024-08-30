import {apiRoot} from "./apiRoot";
import { ToolEntity, ToolInterface } from '../models/entities';
// @ts-expect-error get-browser-fingerprint is not typed
import getBrowserFingerprint from "get-browser-fingerprint"

const deviceHash = getBrowserFingerprint({ enableWebgl: true }).toString()

export const getToolsAll = async (token: string) => {
    try {
        const response = await fetch(`${apiRoot}/tools/all`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "device-hash": deviceHash
            },
        })

        if (!response.ok) {
            throw new Error("error_unknown");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getToolsById = async (token: string, id: string) => {
    try {
        const response = await fetch(`${apiRoot}/tools/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "device-hash": deviceHash
            },
        })

        if (!response.ok) {
            throw new Error("error_unknown");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const createTools = async (adminToken: string, data: ToolInterface) => {
    try {
        const response = await fetch(`${apiRoot}/tools`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

export const updateTools = async (adminToken: string, data: ToolEntity) => {
    try {
        const response = await fetch(`${apiRoot}/tools`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

export const deleteToolsById = async (adminToken: string, id: string) => {
    try {
        const response = await fetch(`${apiRoot}/tools/${id}`, {
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
