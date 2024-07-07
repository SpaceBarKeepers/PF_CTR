import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import './inputs.scss';
import { SelectBoxOptionEntity } from '../../models/entities';
import './inputs.scss';

type Props = {
    label: string;
    options: SelectBoxOptionEntity[];
    state: Record<string, any>;
    setState: Dispatch<SetStateAction<Record<string, any>>>
    name: string;
};


const SelectBox = ({ label, options, state, setState, name }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setState((prev) => ({ ...prev, [name]: Number(e.target.value) }));
    };

    return (
        <label htmlFor={name} className={'inputLabel'}>
            {label}
            <select onChange={handleChange} value={state?.[name] ?? undefined}>
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