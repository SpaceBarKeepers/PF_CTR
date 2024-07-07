import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import "./inputs.scss"

type Props = {
    label: string;
    state: Record<string, any>;
    setState: Dispatch<SetStateAction<Record<string, any>>>
    name: string;
};


const Input = ({ label, state, setState, name }: Props) =>  {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, [name]: e.target.value }));
    };

    return (
        <label htmlFor={name} className={"inputLabel"}>
        {label}
        <input value={state?.[name]} type={"text"} onChange={handleChange} {...{ name }} />
        </label>
    );
}

export default Input;