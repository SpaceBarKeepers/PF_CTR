import React from 'react';
import Footer from '../components/Footer/Footer';
import './layoutPrivateWrapper.scss';
import Header from '../components/Header/Header';

type Props = {
    children: React.ReactNode
}

const LayoutPublicWrapper = ({ children }: Props) => {
    return (
        <div className={'layoutPrivateWrapper'}>
            <Header />
            <main className={"layoutPrivateWrapper__page"}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default LayoutPublicWrapper;