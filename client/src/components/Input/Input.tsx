import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import './inputs.scss';

type Props = {
    label: string;
    state: any;
    setState: Dispatch<SetStateAction<any>>
    name: string;
};


const Input = ({ label, state, setState, name }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev: any) => ({ ...prev, [name]: e.target.value }));
    };

    return (
        <label htmlFor={name} className={'inputLabel'}>
            {label}
            <input value={state?.[name]} type={'text'} onChange={handleChange} {...{ name }} />
        </label>
    );
};

export default Input;