import { useState } from 'react';
import "./faqRow.scss";

type Props = {
    question: string;
    answer: string;
}

const FaqRow = ({ question, answer }: Props) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div className={"faqRow"}>
            <div className={"faqRow__question"} onClick={handleClick}>
                {question}
                <img
                    src={open ? "/icons/icon_chevron_up.svg" : "/icons/icon_chevron_down.svg"}
                    alt="arrow"
                />
            </div>
            <p
                className={"faqRow__answer"}
                style={{
                    padding: open ? "45px" : "0px 45px 0 45px",
                    maxHeight: open ? "fit-content" : "0px",
                }}
            >
                {answer}
            </p>
        </div>
    );
}

export default FaqRow;