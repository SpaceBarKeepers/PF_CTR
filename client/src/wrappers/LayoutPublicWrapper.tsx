import React from 'react';
import LandingPageHeader from '../components/LandingPageHeader/LandingPageHeader';

type Props = {
    children: React.ReactNode
}

const LayoutPublicWrapper = ({ children }: Props) => {
    return (
        <div>
        <LandingPageHeader />
        {children}
        </div>
    );
}

export default LayoutPublicWrapper;