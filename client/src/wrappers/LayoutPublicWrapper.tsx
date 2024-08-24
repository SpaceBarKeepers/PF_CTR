import React from 'react';
import LandingPageHeader from '../components/LandingPageHeader/LandingPageHeader';
import Footer from '../components/Footer/Footer';
import "./layoutPublicWrapper.scss"

type Props = {
    children: React.ReactNode
}

const LayoutPublicWrapper = ({ children }: Props) => {
    return (
        <div className={"layoutPublicWrapper"}>
            <LandingPageHeader />
            {children}
            <Footer />
        </div>
    );
};

export default LayoutPublicWrapper;