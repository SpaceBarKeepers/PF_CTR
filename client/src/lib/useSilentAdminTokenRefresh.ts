import {useAtom} from "jotai";
import {tokenAdminAtom} from "../atomStore";
import {jwtDecode} from "jwt-decode";
import {adminTokenRefresh} from "../api/admin";
import {TokenAdminEntity} from "../models/entities";
import {useAdminLogout} from "./logoutAdmin";

export const useSilentAdminTokenRefresh = () => {
    const [adminToken, setAdminToken] = useAtom(tokenAdminAtom)
    const logout = useAdminLogout()

    return async () => {
        if (adminToken) {
            const now = Date.now()
            const expires = jwtDecode(adminToken.admin_token).exp! * 1000
            const timeUntilExpiration = expires - now

            if (timeUntilExpiration < 1000 * 60) {
                adminTokenRefresh()
                    .then((response: TokenAdminEntity) => {
                        setAdminToken(response)
                        return response.admin_token
                    })
                    .catch((error: Error) => {
                        if (error.message === "error_invalid_refresh") {
                            logout()
                        }
                        console.error(error)
                    })
            } else {
                return adminToken.admin_token
            }
        } else {
            adminTokenRefresh()
                .then((response: TokenAdminEntity) => {
                    setAdminToken(response)
                    return response.admin_token
                })
                .catch((error: Error) => {
                    if (error.message === "error_invalid_refresh") {
                        logout()
                    }
                    console.error(error)
                })
        }
    }
}
