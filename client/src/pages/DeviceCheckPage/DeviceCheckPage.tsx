import { useEffect, useState } from 'react';
import { checkDeviceHash, reassignDevice } from '../../api/auth';
import { useAtomValue } from 'jotai';
import { redirectUrlAtom, tokenAtom } from '../../atomStore';
import { useForcedLogout } from '../../lib/logout';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import './deviceCheckPage.scss';
import ButtonColored from '../../components/Button/ButtonColored';
import LayoutPublicWrapper from '../../wrappers/LayoutPublicWrapper';

const DeviceCheckPage = () => {
    const [promptReassignDevice, setPromptReassignDevice] = useState<boolean>(false);
    const redirectUrl = useAtomValue(redirectUrlAtom);
    const token = useAtomValue(tokenAtom)?.access_token;
    const logout = useForcedLogout();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            logout();
            return;
        }
        checkDeviceHash(token)
            .then((response) => {
                if (response.status === 200) redirectUrl ? navigate(redirectUrl) : navigate('/homepage');
            })
            .catch((error) => {
                if (error.message === 'error_invalid_device_hash') {
                    setPromptReassignDevice(true);
                } else {
                    if (error.message === 'error_invalid_token') logout();
                    else console.error(error);
                }
            });
    }, [logout, navigate, promptReassignDevice, redirectUrl, token]);

    const handleReassignDevice = () => {
        if (!token) return;
        reassignDevice(token).then(() => setPromptReassignDevice(false));
    };

    return (
        <LayoutPublicWrapper>
            <div className={'deviceCheckPage'}>
                <div className={'deviceCheckPage__container'}>
                    {
                        promptReassignDevice
                            ? <div className={'deviceCheckPage__check'}>
                                <h3>Do you want to continue from this device?</h3>
                                <p>You are only allowed to be logged in from one device/browser at a time.</p>
                                <div className={'deviceCheckPage__checkActions'}>
                                    <ButtonColored onClick={logout} childIsLink={false} buttonType={'secondary'}>
                                        <FormattedMessage id={'label_logout'} defaultMessage={'Logout'} />
                                    </ButtonColored>
                                    <ButtonColored onClick={handleReassignDevice} childIsLink={false}>
                                        <FormattedMessage
                                            id={'label_device_continue'}
                                            defaultMessage={'Continue from this device'} />
                                    </ButtonColored>
                                </div>
                            </div>
                            : <div className={'deviceCheckPage__loader'}>
                                Loading...
                            </div>
                    }
                </div>
            </div>
        </LayoutPublicWrapper>
    );
};

export default DeviceCheckPage;
