import "./landingPageCard.scss"

type Props = {
    image: string;
    imageType?: "normal" | "icon";
    heading: string;
    text: string;
}

const LandingPageCard = ({ image, imageType = "normal", heading, text }: Props) => {
    return (
        <div className={`landingPageCard`}>
            <img className={imageType === "icon" ? "iconImage" : undefined} src={image} alt={heading} />
            <h3>{heading}</h3>
            <p>{text}</p>
        </div>
    );
};

export default LandingPageCard;