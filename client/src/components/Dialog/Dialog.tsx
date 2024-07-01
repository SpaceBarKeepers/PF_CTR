import OutsideClickHandler from "react-outside-click-handler"
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode;
};
}

const Dialog = ({ setOpen, children }) => {

    const handleCloseDialog = () => {
        setOpen(false);
    }

    return (
        <OutsideClickHandler onOutsideClick={handleCloseDialog}>
            {children}
        </OutsideClickHandler>
    );
}

export default Dialog;