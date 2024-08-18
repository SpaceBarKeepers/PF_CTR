import { useEffect, useState } from 'react';
import { checkDeviceHash, reassignDevice } from '../../api/auth';
import { useAtomValue } from 'jotai';
import { redirectUrlAtom, tokenAtom } from '../../atomStore';
import { useForcedLogout } from '../../lib/logout';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const DeviceCheckPage = () => {
    const [promptReassignDevice, setPromptReassignDevice] = useState<boolean>(false)
    const redirectUrl = useAtomValue(redirectUrlAtom)
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
                if (response.status === 200) redirectUrl ? navigate(redirectUrl) : navigate("/homepage")
            })
            .catch((error) => {
                if (error.message === "error_invalid_device_hash") {
                    setPromptReassignDevice(true)
                } else {
                    if (error.message === "error_invalid_token") logout()
                    else console.error(error)
                }
            })
    }, [logout, navigate, promptReassignDevice, redirectUrl, token]);

    const handleReassignDevice = () => {
        if (!token) return
        reassignDevice(token).then(() => setPromptReassignDevice(false))
    }

    return (
        <div>
            {
                promptReassignDevice
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
