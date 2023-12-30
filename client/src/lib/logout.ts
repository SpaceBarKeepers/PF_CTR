import {useSetAtom} from "jotai";
import {tokenAtom} from "../atomStore";
import {logout} from "../api/user";

export const useForcedLogout = () => {
    const setToken = useSetAtom(tokenAtom);

    return () => {
        logout();
        setToken(null);
    };
}
