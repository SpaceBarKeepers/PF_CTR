import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { KnowledgeBaseInterface } from '../../pagesAdmin/AdminKnowledgeEditPage/AdminKnowledgeEditPage';
import './inputs.scss';
import { SelectBoxOptionEntity } from '../../models/entities';
import './inputs.scss';

type Props = {
    label: string;
    options: SelectBoxOptionEntity[];
    state: KnowledgeBaseInterface;
    setState: Dispatch<SetStateAction<KnowledgeBaseInterface>>
    name: string;
};


const SelectBox = ({ label, options, state, setState, name }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setState((prev) => ({ ...prev, [name]: Number(e.target.value) }));
    };

    return (
        <label htmlFor={name} className={'inputLabel'}>
            {label}
            <select onChange={handleChange} value={state?.[name as keyof KnowledgeBaseInterface] ?? undefined}>
                {options.map((option) => {
                        return (
                            <option
                                key={option.label}
                                value={option.value || ''}
                            >
                                {option.label}
                            </option>
                        );
                    },
                )}
            </select>
        </label>
    );
};

export default SelectBox;