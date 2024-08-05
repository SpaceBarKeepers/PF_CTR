import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import './orderInput.scss';

type Props = {
    label: string;
    multiline?: boolean;
    required?: boolean;
    state: string;
    setState: Dispatch<SetStateAction<string>>
}

const OrderInput = ({ label, multiline = false, required = false, state, setState }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setState(e.target.value);
    };

    return (
        <div className={'orderInput'}>
            <label>
                {`${label}${required ? '*' : ''}`}
            </label>
            {multiline
                ? <textarea
                    value={state}
                    onChange={handleChange}
                    rows={5}
                />
                : <input
                    type="text"
                    value={state}
                    onChange={handleChange}
                />}
        </div>
    );
};

export default OrderInput;