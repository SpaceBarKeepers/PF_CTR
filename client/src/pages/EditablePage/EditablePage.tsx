import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import { getPageById } from '../../api/page';
import { PageEntity } from '../../models/page';

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
    <div className={'editablePage'}>
      <Header />
      {page?.contentEn && (
        <div
          dangerouslySetInnerHTML={{ __html: page.contentEn }}
          className={'richtext'}
        />
      )}
    </div>
  );
};

export default EditablePage;
