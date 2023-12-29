import React, {useEffect, useState} from 'react';
import {checkDeviceHash, reassignDevice} from "../../api/user";
import {useAtomValue} from "jotai";
import {tokenAtom} from "../../atomStore";
import {useForcedLogout} from "../../lib/forceLogout";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";

type Props = {};

const DeviceCheckPage = ({}: Props) => {
    const [propmpReassignDevice, setPromptReassignDevice] = useState<boolean>(false)
    const token = useAtomValue(tokenAtom)?.access_token
    const logout = useForcedLogout()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            logout()
            return
        }
        checkDeviceHash(token)
            .then((response) => {
                if (response.status === 200) navigate("/homepage")
            })
            .catch((error) => {
                if (error.message === "error_invalid_device_hash") {
                    setPromptReassignDevice(true)
                } else {
                    if (error.message === "error_invalid_token") logout()
                    else console.error(error)
                }
            })
    }, [propmpReassignDevice]);

    const handleReassignDevice = () => {
        if (!token) return
        reassignDevice(token).then(() => setPromptReassignDevice(false))
    }

    return (
        <div>
            {
                propmpReassignDevice
                ? <div>
                    <button onClick={logout}><FormattedMessage id={"label_logout"} defaultMessage={"Logout"} /></button>
                    <button onClick={handleReassignDevice}><FormattedMessage id={"label_device_continue"} defaultMessage={"Continue from this device"} /></button>
                </div>
                    : <div>
                    Loader
                    </div>
            }
        </div>
    );
};

export default DeviceCheckPage;
