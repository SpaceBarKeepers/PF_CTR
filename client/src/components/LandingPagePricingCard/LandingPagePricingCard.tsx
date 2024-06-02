import React from 'react';
import "./landingPagePricingCard.scss"

type Props = {
    title: string;
    options: (string|React.ReactNode)[];
    children: React.ReactNode;
}

const LandingPagePricingCard = ({ title, options, children }: Props) => {
    return (
        <div className={'landingPagePricingCard'}>
            <h3>{title}</h3>
            <ul>
                {options.map((option, index) => (
                    <li key={index}>{option}</li>
                ))}
            </ul>
            {children}
        </div>
    );
};

export default LandingPagePricingCard;