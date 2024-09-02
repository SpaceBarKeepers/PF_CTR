import "./footer.scss"

const Footer = () => {
    return (
        <footer className="footer">
            <div className={'footer__logos'}>
                <img className={"footer__logo1"} src={'/images/PFlogo.png'} alt={'logo Participation Factory'} />
                <img className={"footer__logo2"} src={'/images/demtech_logo.svg'} alt={'logo Decmocracy Technologies'} />
                <img className={"footer__logo3"} src={'/images/IPIlogo.svg'} alt={'logo Innovation in Politics Institute'} />
            </div>
            <div className={'footer__abstract'}>
                <h3>
                    Participation Factory s.r.o.
                </h3>
                <p>
                    <b>Web: </b> <a href={"https://participationfactory.com"}>www.participationfactory.com</a>
                </p>
                <p>
                    <b>E-mail: </b> <a href={"mailto:info@participationfactory.com"}>info@participationfactory.com</a>
                </p>
                <p className={"footer__links"}>
                    <a href={"https://drive.google.com/file/d/18b4_vOCgR_JCa-KtpHBAgo8-W3pbbNn-/view?usp=sharing"} target={"_blank"}>Confidentiality agreement</a>
                    {' | '}
                    <a href={"#"} target={"_blank"}>Privacy policy</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;