import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import "./inputs.scss"

type Props = {
    label: string;
    state: any;
    setState: Dispatch<SetStateAction<any>>
    name: string;
};


const TimeInput = ({ label, state, setState, name }: Props) =>  {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setState((prev:any) => ({ ...prev, [name]: e.target.value }));
    };

    return (
        <label htmlFor={name} className={"inputLabel"}>
            {label}
            <input
                value={state?.[name]}
                type={"time"}
                onChange={handleChange} {...{ name }}
            />
        </label>
    );
}

export default TimeInput;