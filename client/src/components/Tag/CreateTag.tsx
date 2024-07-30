import React, { useRef, useState } from 'react';
import Dialog from '../Dialog/Dialog';
import './tag.scss';
import ButtonColored from '../Button/ButtonColored';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { createTag } from '../../api/tag';

type Props = {
    updateTags: () => void;
}

const CreateTag = ({updateTags}: Props) => {
    const [tagCzech, setTagCzech] = useState('');
    const [tagEnglish, setTagEnglish] = useState('');
    const getToken = useSilentAdminTokenRefresh();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleOpenDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const handleCloseDialog = () => {
        dialogRef.current?.close();
    };

    const handleCreateTag = () => {
        getToken()
            .then((token) => {
                if (!token) return;
                createTag(token, { tagEn: tagEnglish, tagCs: tagCzech })
                    .then((response) => {
                        console.log(response);
                        dialogRef.current?.close();
                        updateTags();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
    };

    const handleTagCzech = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagCzech(e.target.value);
    };

    const handleTagEnglish = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagEnglish(e.target.value);
    };

    return (
        <div className={`tag`} onClick={handleOpenDialog}>
            + Přidat tag
            <Dialog {...{ dialogRef }}>
                <div className={'dialog__contentContainer'}>
                    <input
                        autoFocus
                        className={'tag__createTagInput'}
                        type="text"
                        placeholder="GeoTag v češtině"
                        onChange={handleTagCzech}
                    />
                    <input
                        className={'tag__createTagInput'}
                        type="text"
                        placeholder="GeoTag in English"
                        onChange={handleTagEnglish}
                    />
                </div>
                <div className={'dialog__buttonContainer'}>
                    <ButtonColored onClick={handleCloseDialog} type={'secondary'}
                                   childIsLink={false}>Zrušit</ButtonColored>
                    <ButtonColored onClick={handleCreateTag} childIsLink={false}>Vytvořit</ButtonColored>
                </div>
            </Dialog>
        </div>
    );
};

export default CreateTag;