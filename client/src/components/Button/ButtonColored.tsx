import React from 'react';
import "./buttons.scss"

type Props = {
    children: React.ReactNode,
    childIsLink?: boolean,
    onClick?: () => void,
    type?: "primary" | "secondary",
    size?: "normal" | "large"
}

const ButtonColored = ({ children, childIsLink = true, onClick, type = "primary", size = "normal" }: Props) => {
    return (
        <button
            className={`button${type === "secondary" ? " buttonSecondary" : " buttonPrimary"}${size === "large" ? " buttonLarge" : ""}${childIsLink ? "" : " buttonWithoutLink"}`}
            {...{onClick}}
        >
            {children}
        </button>
    );
}

export default ButtonColored;