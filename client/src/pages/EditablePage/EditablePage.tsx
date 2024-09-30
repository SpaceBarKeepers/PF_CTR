import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageById } from '../../api/page';
import { PageEntity } from '../../models/page';
import LayoutPrivateWrapper from '../../wrappers/LayoutPrivateWrapper';
import { useSilentTokenRefresh } from '../../lib/useSilentTokenRefresh';

const EditablePage = () => {
    const [page, setPage] = useState<PageEntity | null>(null);
    const pageId = useLocation().pathname.split('/').pop();
    const getToken = useSilentTokenRefresh();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!pageId) return;
        getToken()
            .then((token) => {
                getPageById(token, pageId)
                    .then((response) => {
                        setPage(response);
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    }, [pageId]); //eslint-disable-line react-hooks/exhaustive-deps

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
