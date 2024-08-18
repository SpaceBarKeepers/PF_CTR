import { Dispatch, SetStateAction, useState } from 'react';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { createFile, deleteFile } from '../../api/file';
import { ChangeEvent } from 'react';

type Props = {
    label: string;
    state: any;
    setState: Dispatch<SetStateAction<any>>
    name: string;
};

const Image = ({ label, name, state, setState }: Props) => {
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const getToken = useSilentAdminTokenRefresh();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setSelectedFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        setIsUploading(true);

        try {
            getToken()
                .then((token) => {
                    if (!token) return;
                    createFile(token, formData)
                        .then((res) => {
                            res.json()
                                .then((data) => {
                                    setState((prev: any) => ({ ...prev, [name]: data.url }));
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                });
        } catch (error) {
            console.error('Error uploading image', error);
        } finally {
            setIsUploading(false);
        }
    };

    const deleteImage = () => {
        try {
            getToken()
                .then((token) => {
                    if (!token) return;
                    deleteFile(token, state?.[name])
                        .then((res) => {
                            res.json()
                                .then(() => {
                                    setState((prev: any) => ({ ...prev, [name]: undefined }));
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                });
        } catch (error) {
            console.error('Error uploading image', error);
        } finally {
            setIsUploading(false);
        }
        setSelectedFile(null);
    };

    return (
        <div>
            {!state?.[name]  ? (
                <div>
                    {isUploading ? (
                        <div className="spinner">Uploading...</div>
                    ) : (
                        <div>
                            <label htmlFor={name} className={'inputLabel'}>
                                {label}
                                <input type="file" onChange={handleFileChange} />
                                <button onClick={uploadImage} disabled={!selectedFile}>
                                    Upload Image
                                </button>
                            </label>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <img src={state?.[name]} alt="Uploaded" style={{ width: '200px' }} />
                    <button onClick={deleteImage}>Delete Image</button>
                </div>
            )}
        </div>
    );
};

export default Image;