import React from 'react';
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

type Props = {};

const HomePageHeader = ({}: Props) => {
    return (
        <div>
            <Link to={"/login"}><FormattedMessage id={"label_login"} defaultMessage={"Login"}/></Link>
        </div>
    );
};

export default HomePageHeader;
