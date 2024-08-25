import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageById } from '../../api/page';
import { PageEntity } from '../../models/page';
import LayoutPrivateWrapper from '../../wrappers/LayoutPrivateWrapper';

const EditablePage = () => {
    const [page, setPage] = useState<PageEntity | null>(null);
    const pageId = useLocation().pathname.split('/').pop();

    useEffect(() => {
        if (!pageId) return;
        getPageById(pageId)
            .then((response) => {
                setPage(response);
            })
            .catch((error) => console.error(error));
    }, [pageId]);

    return (
        <LayoutPrivateWrapper background={'white'}>
            <div className={'editablePage'}>
                {page?.contentEn && (
                    <div
                        dangerouslySetInnerHTML={{ __html: page.contentEn }}
                        className={'richtext'}
                    />
                )}
            </div>
        </LayoutPrivateWrapper>
    );
};

export default EditablePage;
