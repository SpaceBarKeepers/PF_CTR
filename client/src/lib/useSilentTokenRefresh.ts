import {useAtom} from "jotai";
import { tokenAtom } from '../atomStore';
import {jwtDecode} from "jwt-decode";
import { useForcedLogout } from './logout';
import { tokenRefresh } from '../api/auth';

export const useSilentTokenRefresh = () => {
    const [token, setToken] = useAtom(tokenAtom)
    const logout = useForcedLogout()

    return async () => {
        if (token) {
            const now = Date.now();
            const expires = jwtDecode(token.access_token).exp! * 1000;
            const timeUntilExpiration = expires - now;

            if (timeUntilExpiration < 1000 * 60) {
                try {
                    const response = await tokenRefresh();
                    setToken(response);
                    return response.access_token;
                } catch (error: any) {
                    if (error.message === "error_invalid_refresh") {
                        logout();
                    }
                    console.error(error);
                    throw error; // Rethrow error to indicate failure
                }
            } else {
                return token.access_token;
            }
        } else {
            try {
                const response = await tokenRefresh();
                setToken(response);
                return response.access_token;
            } catch (error: any) {
                if (error.message === "error_invalid_refresh") {
                    logout();
                }
                console.error(error);
                throw error; // Rethrow error to indicate failure
            }
        }
    };
}
