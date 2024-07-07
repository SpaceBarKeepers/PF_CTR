import { Dispatch, SetStateAction } from 'react';

type Props = {
    label: string;
    state: Record<string, any>;
    setState: Dispatch<SetStateAction<Record<string, any>>>
    name: string;
};

const Image = ({ label, state, setState, name }: Props) => {
    return (
        <div>
            Dodělat Image!!!!
            <label htmlFor={name} className={"inputLabel"}>
                {label}
        <input type="file" />
            </label>
        </div>
    );
}

export default Image;