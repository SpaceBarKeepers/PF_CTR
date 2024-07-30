import "./tag.scss";

type Props = {
    label: string;
    onClick: (value: string) => () => void;
    selected: boolean;
    value: string;
}

const GeoTag = ({ label, onClick, value, selected }: Props) => {
    return (
        <div className={`tag${selected ? " tag--selected" : ""}`} onClick={onClick(value)}>
            {label}
        </div>
    );
}

export default GeoTag;