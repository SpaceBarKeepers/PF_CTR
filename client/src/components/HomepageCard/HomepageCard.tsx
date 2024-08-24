import "./homepageCard.scss";

type Props = {
    color: string;
    title: string;
    description: string;
    icon: string;
    size?: "small" | "large";
    onClick?: () => void;
};

const HomepageCard = ({color, title, description, icon, size = "small", onClick}: Props) => {
    return (
        <div
            className={`homepageCard${size === "large" ? " homepageCard--large" : ""}`}
            style={{borderColor: color}}
            {...{onClick}}
        >
            <div
                className={`homepageCard__icon`}
                style={{backgroundColor: color}}
            >
                <img src={icon} alt={""} />
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default HomepageCard;