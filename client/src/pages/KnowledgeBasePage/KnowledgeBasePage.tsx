import { KnowledgeBaseEntity } from '../../models/knowledge';
import { useEffect, useState } from 'react';
import { getKnowledgeAll } from '../../api/knowledge';
import FeaturedArticlesHeader from '../../components/FeaturedArticlesHeader/FeaturedArticlesHeader';
import { Link } from 'react-router-dom';
import './knowledgeBasePage.scss';
import LayoutPrivateWrapper from '../../wrappers/LayoutPrivateWrapper';

const KnowledgeBasePage = () => {
    const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseEntity[]>([]);
    const [featuredKnowledgeBase, setFeaturedKnowledgeBase] = useState<KnowledgeBaseEntity[]>([]);

    useEffect(() => {
        const fetchKnowledgeBase = async () => {
            try {
                const response = await getKnowledgeAll();
                setKnowledgeBase(response);

                const featuredByPosition = response
                    .filter((knowledge: KnowledgeBaseEntity) => knowledge.featuredPosition !== null).sort((a: KnowledgeBaseEntity, b: KnowledgeBaseEntity) => a.featuredPosition! - b.featuredPosition!)
                    .filter((knowledge: KnowledgeBaseEntity) => knowledge.publishedEn);

                if (featuredByPosition.length < 4) {
                    const numberOfArticlesPushToFeatured = 4 - featuredByPosition.length;
                    const notFeatured = response.filter((knowledge: KnowledgeBaseEntity) => knowledge.publishedEn).filter((knowledge: KnowledgeBaseEntity) => knowledge.featuredPosition === null);
                    const sortedNotFeatured = notFeatured.sort((a: KnowledgeBaseEntity, b: KnowledgeBaseEntity) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
                    const additionalArticles = sortedNotFeatured.slice(0, numberOfArticlesPushToFeatured);

                    setFeaturedKnowledgeBase([...featuredByPosition, ...additionalArticles]);
                } else {
                    setFeaturedKnowledgeBase(featuredByPosition);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchKnowledgeBase();
    }, []);

    return (
        <LayoutPrivateWrapper>
            <div className={'knowledgeBasePage'}>
                <div className={'knowledgeBasePage__container'}>
                    <FeaturedArticlesHeader articles={featuredKnowledgeBase} slug={'knowledge-base'} />
                    <div className={'knowledgeBasePage__articleContainer'}>
                        {knowledgeBase
                            .filter((knowledge: KnowledgeBaseEntity) => !featuredKnowledgeBase.some((featured: KnowledgeBaseEntity) => featured.id === knowledge.id))
                            .filter((knowledge: KnowledgeBaseEntity) => knowledge.publishedEn)
                            .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
                            .map((knowledge: KnowledgeBaseEntity) => (
                                <Link
                                    className={'knowledgeBasePage__articleCard'}
                                    to={`/knowledge-base/${knowledge.id}`}
                                    key={knowledge.id}
                                >
                                    <img src={knowledge.thumbnail} alt={knowledge.titleEn} />
                                    <div className={'knowledgeBasePage__articleCardLabel'}>
                                        <h3>{knowledge.titleEn}</h3>
                                        <p>{knowledge.subtitleEn}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </LayoutPrivateWrapper>
    );
};

export default KnowledgeBasePage;