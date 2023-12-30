import {apiRoot} from "./apiRoot";

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

export const deleteUserByUsername = async (adminToken: string, username: string) => {
    try {
        const response = await fetch(`${apiRoot}/user/${username}`, {
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
