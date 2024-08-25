import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import './inputs.scss';

type Props = {
    label: string;
    state: any;
    setState: Dispatch<SetStateAction<any>>
    name: string;
    addInputInFront?: boolean;
};


const ArrayTextInput = ({ addInputInFront = false, label, state, setState, name }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setState((prev: any) => ({
            ...prev,
            [name]: [
                ...prev[name].slice(0, index),
                e.target.value,
                ...prev[name].slice(index + 1),
            ],
        }));
    };

    const addInputAfter = () => {
        setState((prev: any) => ({
            ...prev,
            [name]: [
                ...(prev[name] || []), // If prev[name] is undefined, initialize it as an empty array
                '',
            ],
        }));
    };
    const addInputBefore = () => {
        setState((prev: any) => ({
            ...prev,
            [name]: [
                '',
                ...(prev[name] || []), // If prev[name] is undefined, initialize it as an empty array
            ],
        }));
    };

    const removeInput = (index: number) => {
        const newInputs = state?.[name].filter((_: any, i: number) => i !== index);
        setState((prev: any) => ({
            ...prev,
            [name]: newInputs,
        }));
    };

    return (
        <label htmlFor={name} className={'inputLabel multipleInput'}>
            {label}
            {addInputInFront && <button onClick={addInputBefore}>Add Input</button>}
            {state?.[name] && state[name].map((item: string, index: number) => (
                    <div>
                        <input key={index} value={item} type={'text'}
                               onChange={(e) => handleChange(e, index)} {...{ name }} />
                        <button onClick={() => removeInput(index)}>-</button>
                    </div>
                ),
            )}
            {!addInputInFront && <button onClick={addInputAfter}>Add Input</button>}
        </label>
    );
};

export default ArrayTextInput;