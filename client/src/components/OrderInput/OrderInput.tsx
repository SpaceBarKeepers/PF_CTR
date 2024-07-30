import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import "./orderInput.scss";

type Props = {
    label: string;
    required?: boolean;
    state: string;
    setState: Dispatch<SetStateAction<string>>
}

const OrderInput = ({ label, required = false, state, setState }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    };

    return (
        <div className={"orderInput"}>
            <label>
                {`${label}${required ? "*" : ""}`}
            </label>
            <input
                type="text"
                value={state}
                onChange={handleChange}
            />
        </div>
    );
};

export default OrderInput;