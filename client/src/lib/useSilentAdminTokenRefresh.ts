import {useAtom} from "jotai";
import {tokenAdminAtom} from "../atomStore";
import {jwtDecode} from "jwt-decode";
import {adminTokenRefresh} from "../api/admin";
import {useAdminLogout} from "./logoutAdmin";

export const useSilentAdminTokenRefresh = () => {
    const [adminToken, setAdminToken] = useAtom(tokenAdminAtom)
    const logout = useAdminLogout()

    return async () => {
        if (adminToken) {
            const now = Date.now();
            const expires = jwtDecode(adminToken.admin_token).exp! * 1000;
            const timeUntilExpiration = expires - now;

            if (timeUntilExpiration < 1000 * 60) {
                try {
                    const response = await adminTokenRefresh();
                    setAdminToken(response);
                    return response.admin_token;
                } catch (error: any) {
                    if (error.message === "error_invalid_refresh") {
                        logout();
                    }
                    console.error(error);
                    throw error; // Rethrow error to indicate failure
                }
            } else {
                return adminToken.admin_token;
            }
        } else {
            try {
                const response = await adminTokenRefresh();
                setAdminToken(response);
                return response.admin_token;
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
