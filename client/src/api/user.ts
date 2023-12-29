import {apiRoot} from "./apiRoot";
import getBrowserFingerprint from "get-browser-fingerprint"

const deviceHash = getBrowserFingerprint({ enableWebgl: true }).toString()

export const loginUserWithUsernameAndPassword = async (username: string, password: string) => {
    try {
        const response = await fetch(`${apiRoot}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })


        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_credentials");
            } else {
                throw new Error("error_unknown");
            }
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const tokenRefresh = async () => {
    try {
        const response = await fetch(`${apiRoot}/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "device-hash": deviceHash
            },
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_refresh");
            } else if (response.status === 418) {
                throw new Error("error_invalid_device_hash");
            } else {
                throw new Error("error_unknown");
            }
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const logout = async () => {
    try {
        const response = await fetch(`${apiRoot}/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "device-hash": deviceHash
            },
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_refresh");
            } else if (response.status === 418) {
                throw new Error("error_invalid_device_hash");
            } else {
                throw new Error("error_unknown");
            }
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const checkDeviceHash = async (token: string) => {
    try {
        const response = await fetch(`${apiRoot}/auth/checkDevice`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "device-hash": deviceHash
            },
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_refresh");
            } else if (response.status === 418) {
                throw new Error("error_invalid_device_hash");
            } else {
                throw new Error("error_unknown");
            }
        }

        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const reassignDevice = async (token: string) => {
    try {
        const response = await fetch(`${apiRoot}/auth/reassignDevice`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "device-hash": deviceHash
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
