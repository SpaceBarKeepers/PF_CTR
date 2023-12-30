import {apiRoot} from "./apiRoot";

export const adminLogin = async (username: string, password: string) => {
    try {
        const response = await fetch(`${apiRoot}/auth/admin/login`, {
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

export const adminTokenRefresh = async () => {
    try {
        const response = await fetch(`${apiRoot}/auth/admin/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
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
