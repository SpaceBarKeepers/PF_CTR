import React, { MouseEvent, RefObject } from 'react';
import "./dialog.scss"

type Props = {
    children: React.ReactNode;
    dialogRef: RefObject<HTMLDialogElement>
}

const Dialog = ({ children, dialogRef }: Props) => {
    const stopPropagation = (e: MouseEvent<HTMLDialogElement>) => {
        e.stopPropagation();
        e.preventDefault()
    }

    return (
        // <OutsideClickHandler onOutsideClick={handleCloseDialog}>
            <dialog ref={dialogRef} className={"dialog"} onClick={stopPropagation}>
                {children}
            </dialog>
        // </OutsideClickHandler>
    );
}

export default Dialog;