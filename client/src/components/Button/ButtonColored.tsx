import { COLORS_ENUM } from '../../models/enums';
import React from 'react';
import "./buttons.scss"

type Props = {
    children: React.ReactNode,
    type?: "primary" | "secondary",
    size?: "normal" | "large"
}

const ButtonColored = ({ children, type = "primary", size = "normal" }: Props) => {
    return (
        <button
            className={`button${type === "secondary" ? " buttonSecondary" : " buttonPrimary"}`}
        >
            {children}
        </button>
    );
}

export default ButtonColored;