import { apiRoot } from './apiRoot';

export const createFile = async (adminToken: string, file: FormData) => {
    try {
        const response = await fetch(`${apiRoot}/file`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": "Bearer " + adminToken,
                // "Content-Type": 'multipart/form-data',
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