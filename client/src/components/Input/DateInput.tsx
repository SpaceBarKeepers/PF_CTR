import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import "./inputs.scss"
import { dateStringToDate, dateToDateString } from '../../lib/dateConversions';

type Props = {
    label: string;
    state: Record<string, any>;
    setState: Dispatch<SetStateAction<Record<string, any>>>
    name: string;
    min?: string;
    max?: string;
};


const DateInput = ({ label, state, setState, name, min, max }: Props) =>  {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setState((prev) => ({ ...prev, [name]: dateStringToDate(e.target.value) }));
    };

    return (
        <label htmlFor={name} className={"inputLabel"}>
            {label}
            <input
                value={state?.[name] ? dateToDateString(state?.[name]) : undefined}
                type={"date"}
                onChange={handleChange} {...{ name, min, max }}
            />
        </label>
    );
}

export default DateInput;