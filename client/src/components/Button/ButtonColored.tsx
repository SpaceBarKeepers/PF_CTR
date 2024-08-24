import React from 'react';
import "./buttons.scss"

type Props = {
    children: React.ReactNode,
    childIsLink?: boolean,
    disabled?: boolean,
    id?: string,
    onClick?: () => void,
    size?: "normal" | "large"
    style?: Record<string, string>
    buttonType?: "primary" | "secondary",
    type?: "button" | "submit" | "reset"
}

const ButtonColored = ({ children, childIsLink = true, disabled = false, id, onClick, size = "normal", style, buttonType = "primary", type }: Props) => {
    return (
        <button
            className={`button${buttonType === "secondary" ? " buttonSecondary" : " buttonPrimary"}${size === "large" ? " buttonLarge" : ""}${childIsLink ? "" : " buttonWithoutLink"}`}
            {...{disabled, id, onClick, style, type}}
        >
            {children}
        </button>
    );
}

export default ButtonColored;