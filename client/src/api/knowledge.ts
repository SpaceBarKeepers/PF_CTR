import {apiRoot} from "./apiRoot";

export const getKnowledgeAll = async () => {
    try {
        const response = await fetch(`${apiRoot}/knowledge/all`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
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

export const deleteKnowledgeById = async (adminToken: string, id: string) => {
    try {
        const response = await fetch(`${apiRoot}/knowledge/${id}`, {
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
