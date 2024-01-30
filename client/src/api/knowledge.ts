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
