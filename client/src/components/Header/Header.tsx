import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";
import { useForcedLogout } from '../../lib/logout';

type Props = {};

const Header = ({}: Props) => {
    const navigate = useNavigate()
    const logout = useForcedLogout()

    const handleClickAccount = () => {
        navigate("/account")
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            Header
            <button onClick={handleClickAccount}>
                <FormattedMessage
                    id={"label_your_account"}
                    defaultMessage={"Your account"}
                />
            </button>
            <button onClick={handleLogout}>
                <FormattedMessage
                    id={"label_logout"}
                    defaultMessage={"Logout"}
                />
            </button>
        </div>
    );
};

export default Header;
