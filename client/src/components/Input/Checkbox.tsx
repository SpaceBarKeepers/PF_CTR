import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { KnowledgeBaseInterface } from '../../pagesAdmin/AdminKnowledgeEditPage/AdminKnowledgeEditPage';
import "./inputs.scss"

type Props = {
    className?: string;
    label: string;
    setState: Dispatch<SetStateAction<KnowledgeBaseInterface>>
    name: string;
    checked: boolean;
};


const Checkbox = ({ className, label, setState, name, checked = false }: Props) =>  {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, [name]: e.target.checked }));
    };

    return (
        <label htmlFor={name} className={`${className} inputLabel`}>
            {label}
            <input type={"checkbox"} onChange={handleChange} {...{ name, checked }} />
        </label>
    );
}

export default Checkbox;