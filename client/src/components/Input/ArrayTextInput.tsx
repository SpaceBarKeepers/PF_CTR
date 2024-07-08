import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import './inputs.scss';

type Props = {
    label: string;
    state: Record<string, any>;
    setState: Dispatch<SetStateAction<Record<string, any>>>
    name: string;
};


const ArrayTextInput = ({ label, state, setState, name }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setState((prev) => ({
            ...prev,
            [name]: [
                ...prev[name].slice(0, index),
                e.target.value,
                ...prev[name].slice(index + 1),
            ],
        }));
    };

    const addInput = () => {
        setState((prev) => ({
            ...prev,
            [name]: [
                ...prev[name],
                '',
            ],
        }));
    };

    const removeInput = (index: number) => {
        const newInputs = state?.[name].filter((_, i) => i !== index);
        setState((prev) => ({
            ...prev,
            [name]: newInputs,
        }));
    };

    return (
        <label htmlFor={name} className={'inputLabel'}>
            {label}
            {state?.[name] && state[name].map((item: string, index: number) => (
                    <div>
                        <input key={index} value={item} type={'text'}
                               onChange={(e) => handleChange(e, index)} {...{ name }} />
                        <button onClick={() => removeInput(index)}>-</button>
                    </div>
                ),
            )}
            <button onClick={addInput}>Add Input</button>
        </label>
    );
};

export default ArrayTextInput;