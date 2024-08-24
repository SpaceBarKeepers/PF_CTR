import { useEffect, useRef, useState } from 'react';
import Dialog from '../Dialog/Dialog';
import './tag.scss';
import ButtonColored from '../Button/ButtonColored';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { deleteTagById, getTagAll } from '../../api/tag';
import { TagEntity } from '../../models/entities';
import Tag from './Tag';
import { arrayContainsObject } from '../../lib/arrayContainsObject';

type Props = {
    updateTags: () => void;
}

const DeleteTags = ({ updateTags }: Props) => {
    const [tags, setTags] = useState<TagEntity[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagEntity[]>([]);
    const getToken = useSilentAdminTokenRefresh();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        getTagAll()
            .then((response) => {
                setTags(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dialogRef.current?.showModal]);

    const handleOpenDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const handleCloseDialog = () => {
        dialogRef.current?.close();
    };

    const handleClickTag = (tag: TagEntity) => () => {
        if (arrayContainsObject(selectedTags, tag)) {
            setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleDeleteTags = () => {
        getToken()
            .then((token) => {
                if (!token) return;
                selectedTags.forEach((tag: TagEntity) => {
                    deleteTagById(token, tag.id)
                        .then((response) => {
                            console.log(response);
                            updateTags();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            });
        handleCloseDialog();
    }
    console.log(selectedTags);
    return (
        <div className={`tag`} onClick={handleOpenDialog}>
            - Trvale smazat tagy
            <Dialog {...{ dialogRef }}>
                <div className={'dialog__contentContainer'}>
                    Označ tagy, které chceš smazat:
                    {tags.map((tag) => (
                        <Tag
                            key={`tag-${tag.id}`}
                            tag={tag}
                            onClick={handleClickTag}
                            selected={arrayContainsObject(selectedTags, tag)}
                        />
                    ))}
                </div>
                <div className={'dialog__buttonContainer'}>
                    <ButtonColored onClick={handleCloseDialog} buttonType={'secondary'}
                                   childIsLink={false}>Zrušit</ButtonColored>
                    <ButtonColored onClick={handleDeleteTags} childIsLink={false}>Smazat</ButtonColored>
                </div>
            </Dialog>
        </div>
    );
};

export default DeleteTags;