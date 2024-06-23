import React from 'react';
import "./buttons.scss"

type Props = {
    children: React.ReactNode,
    type?: "primary" | "secondary",
    size?: "normal" | "large"
    childIsLink?: boolean
}

const ButtonColored = ({ children, type = "primary", size = "normal", childIsLink = true }: Props) => {
    return (
        <button
            className={`button${type === "secondary" ? " buttonSecondary" : " buttonPrimary"}${size === "large" ? " buttonLarge" : ""}${childIsLink ? "" : " buttonWithoutLink"}`}
        >
            {children}
        </button>
    );
}

export default ButtonColored;