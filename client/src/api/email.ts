import { apiRoot } from './apiRoot';

export const sendContactEmail = async (body: Record<string, string>) => {
    try {
        const response = await fetch(`${apiRoot}/email/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })


        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("error_invalid_credentials");
            } else {
                throw new Error("error_unknown");
            }
        }

        return;
    } catch (error: any) {
        throw new Error(error.message);
    }
}