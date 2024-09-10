import { fileApiRoot } from './apiRoot';

export const createFile = async (adminToken: string, file: FormData) => {
    try {
        const response = await fetch(`${fileApiRoot}/file`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
            },
            body: file,
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

export const deleteFile = async (adminToken: string, url: string) => {
    const key = url.split("/").pop();
    try {
        const response = await fetch(`${fileApiRoot}/file/${key}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
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