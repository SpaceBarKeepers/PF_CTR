import { ARTICLE_TYPE_ENUM } from '../../models/enums';
import { useEffect, useState } from 'react';
import { getKnowledgeById } from '../../api/knowledge';
import { Link, useParams } from 'react-router-dom';
import { KnowledgeBaseEntity } from '../../models/knowledge';
import { NewsEntity } from '../../models/news';
import Header from '../../components/Header/Header';
import { getNewsById } from '../../api/news';

type Props = {
    type: ARTICLE_TYPE_ENUM;
}

const ArticlePage = ({ type }: Props) => {
    const [article, setArticle] = useState<KnowledgeBaseEntity | NewsEntity | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;
        if (type === ARTICLE_TYPE_ENUM.KNOWLEDGE_BASE) {
            getKnowledgeById(id)
                .then((response) => {
                    setArticle(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (type === ARTICLE_TYPE_ENUM.NEWS) {
            getNewsById(id)
                .then((response) => {
                    setArticle(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [type, id]);

    return (
        <div className={'articlePage'}>
            <Header />
            <div>
                {type === ARTICLE_TYPE_ENUM.KNOWLEDGE_BASE && article && (
                    <>
                        <Link to={`/knowledge-base/`}>
                            Knowledge Base
                        </Link>
                        {'→'}
                        <b>{article.titleEn}</b>
                    </>
                )}
                <h1>{article?.titleEn}</h1>
                <h2>{article?.subtitleEn}</h2>
                {article?.contentEn && <div dangerouslySetInnerHTML={{ __html: article?.contentEn }} />}
            </div>
        </div>
    );
};

export default ArticlePage;