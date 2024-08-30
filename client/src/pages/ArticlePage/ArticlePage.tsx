import { ARTICLE_TYPE_ENUM } from '../../models/enums';
import { useEffect, useState } from 'react';
import { getKnowledgeById } from '../../api/knowledge';
import { Link, useParams } from 'react-router-dom';
import { KnowledgeBaseEntity } from '../../models/knowledge';
import { NewsEntity } from '../../models/news';
import { getNewsById } from '../../api/news';
import LayoutPrivateWrapper from '../../wrappers/LayoutPrivateWrapper';
import "./articlePage.scss"

type Props = {
    type: ARTICLE_TYPE_ENUM;
};

const ArticlePage = ({ type }: Props) => {
    const [article, setArticle] = useState<
        KnowledgeBaseEntity | NewsEntity | null
    >(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

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
        <LayoutPrivateWrapper background={"white"}>
            <div className={'articlePage richtext'}>
                <div>
                    {type === ARTICLE_TYPE_ENUM.KNOWLEDGE_BASE && article && (
                        <div className={'breadcrumps'}>
                            <Link to={`/knowledge-base/`}>Knowledge Base</Link>
                            {'→'}
                            <b>{article.titleEn}</b>
                        </div>
                    )}
                    {type === ARTICLE_TYPE_ENUM.NEWS && article && (
                        <div className={'breadcrumps'}>
                            <Link to={`/news/`}>News</Link>
                            {'→'}
                            <b>{article.titleEn}</b>
                        </div>
                    )}
                    <h1>{article?.titleEn}</h1>
                    <h2>{article?.subtitleEn}</h2>
                    {article?.contentEn && (
                        <div dangerouslySetInnerHTML={{ __html: article?.contentEn }} className={"articlePage__content"} />
                    )}
                </div>
            </div>
        </LayoutPrivateWrapper>
    );
};

export default ArticlePage;
