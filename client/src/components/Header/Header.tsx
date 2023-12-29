import React from 'react';
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";

type Props = {};

const Header = ({}: Props) => {
    const navigate = useNavigate()
    const handleClickAccount = () => {
        navigate("/account")
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
        </div>
    );
};

export default Header;
