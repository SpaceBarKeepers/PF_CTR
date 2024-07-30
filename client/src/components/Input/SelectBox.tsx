import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import './inputs.scss';
import { SelectBoxOptionEntity } from '../../models/entities';
import './inputs.scss';

type Props = {
    label: string;
    options: SelectBoxOptionEntity[];
    state: any;
    setState: Dispatch<SetStateAction<any>>
    name: string;
};


const SelectBox = ({ label, options, state, setState, name }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setState((prev: any) => ({ ...prev, [name]: Number(e.target.value) }));
    };

    return (
        <label htmlFor={name} className={'selectLabel'}>
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