import {useSetAtom} from "jotai";
import {tokenAdminAtom} from "../atomStore";
import {adminLogout} from "../api/admin";

export const useAdminLogout = () => {
    const setToken = useSetAtom(tokenAdminAtom);

    return () => {
        adminLogout();
        setToken(null);
    };
}
