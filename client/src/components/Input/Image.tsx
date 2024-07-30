import { Dispatch, SetStateAction } from 'react';

type Props = {
    label: string;
    state: any;
    setState: Dispatch<SetStateAction<any>>
    name: string;
};

const Image = ({ label, name }: Props) => {
    return (
        <div>
            TODO: Image až bude hotová platební brána a S3 storage
            <label htmlFor={name} className={"inputLabel"}>
                {label}
        <input type="file" />
            </label>
        </div>
    );
}

export default Image;