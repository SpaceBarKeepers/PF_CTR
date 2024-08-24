import {apiRoot} from "./apiRoot";
import { EventEntity } from '../models/entities';

export const getEventsAll = async () => {
    try {
        const response = await fetch(`${apiRoot}/events/all`, {
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

export const getEventById = async (id: string) => {
    try {
        const response = await fetch(`${apiRoot}/events/${id}`, {
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

export const createEvent = async (adminToken: string, data: EventEntity) => {
    try {
        const response = await fetch(`${apiRoot}/events`, {
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

export const updateEvent = async (adminToken: string, data: EventEntity) => {
    try {
        const response = await fetch(`${apiRoot}/events`, {
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

export const deleteEventById = async (adminToken: string, id: string) => {
    try {
        const response = await fetch(`${apiRoot}/events/${id}`, {
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
