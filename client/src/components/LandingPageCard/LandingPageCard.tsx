import "./landingPageCard.scss"

type Props = {
    image: string;
    heading: string;
    text: string;
}

const LandingPageCard = ({ image, heading, text }: Props) => {
    return (
        <div className={'landingPageCard'}>
            <img src={image} alt={heading} />
            <h3>{heading}</h3>
            <p>{text}</p>
        </div>
    );
};

export default LandingPageCard;