import {apiRoot} from "./apiRoot";
import { TagInterface } from '../models/entities';

export const getTagAll = async () => {
    try {
        const response = await fetch(`${apiRoot}/tag/all`, {
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

// export const getTagById = async (id: string) => {
//     try {
//         const response = await fetch(`${apiRoot}/tag/${id}`, {
//             method: "GET",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//
//         if (!response.ok) {
//             throw new Error("error_unknown");
//         }
//
//         return await response.json();
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// }

export const createTag = async (adminToken: string, data: TagInterface) => {
    try {
        const response = await fetch(`${apiRoot}/tag`, {
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

export const deleteTagById = async (adminToken: string, id: number) => {
    try {
        const response = await fetch(`${apiRoot}/tag/${id}`, {
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
