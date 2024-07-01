import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { KnowledgeBaseInterface } from '../../pagesAdmin/AdminKnowledgeEditPage/AdminKnowledgeEditPage';
import "./inputs.scss"

type Props = {
    label: string;
    state: KnowledgeBaseInterface;
    setState: Dispatch<SetStateAction<KnowledgeBaseInterface>>
    name: string;
};


const Input = ({ label, state, setState, name }: Props) =>  {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, [name]: e.target.value }));
    };

    return (
        <label htmlFor={name} className={"inputLabel"}>
        {label}
        <input value={state?.[name as keyof KnowledgeBaseInterface]} type={"text"} onChange={handleChange} {...{ name }} />
        </label>
    );
}

export default Input;