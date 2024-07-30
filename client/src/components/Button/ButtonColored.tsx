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
    type?: "primary" | "secondary",
}

const ButtonColored = ({ children, childIsLink = true, disabled = false, id, onClick, size = "normal", style, type = "primary" }: Props) => {
    return (
        <button
            className={`button${type === "secondary" ? " buttonSecondary" : " buttonPrimary"}${size === "large" ? " buttonLarge" : ""}${childIsLink ? "" : " buttonWithoutLink"}`}
            {...{disabled, id, onClick, style}}
        >
            {children}
        </button>
    );
}

export default ButtonColored;