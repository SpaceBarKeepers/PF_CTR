import React from 'react';
import "./buttons.scss"

type Props = {
    children: React.ReactNode,
    childIsLink?: boolean,
    className?: string,
    disabled?: boolean,
    id?: string,
    onClick?: () => void,
    size?: "normal" | "large"
    style?: Record<string, string>
    buttonType?: "primary" | "secondary",
    type?: "button" | "submit" | "reset"
}

const ButtonColored = ({ children, childIsLink = true, disabled = false, className, id, onClick, size = "normal", style, buttonType = "primary", type }: Props) => {
    return (
        <button
            className={`button${buttonType === "secondary" ? " buttonSecondary" : " buttonPrimary"}${size === "large" ? " buttonLarge" : ""}${childIsLink ? "" : " buttonWithoutLink"}${className ? ` ${className}` : ""}`}
            {...{disabled, id, onClick, style, type}}
        >
            {children}
        </button>
    );
}

export default ButtonColored;