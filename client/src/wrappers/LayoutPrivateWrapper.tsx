import React from 'react';
import Footer from '../components/Footer/Footer';
import './layoutPrivateWrapper.scss';
import Header from '../components/Header/Header';

type Props = {
    children: React.ReactNode
    background?: string
}

const LayoutPrivateWrapper = ({ background, children }: Props) => {
    return (
        <div
            className={'layoutPrivateWrapper'}
            style={{ background: background ? `${background}` : undefined }}
            >
            <Header />
            <main className={'layoutPrivateWrapper__page'}>
                {children}
            </main>
            <hr />
            <Footer />
        </div>
    );
};

export default LayoutPrivateWrapper;