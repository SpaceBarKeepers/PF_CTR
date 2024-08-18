import Header from '../../components/Header/Header';
import { KnowledgeBaseEntity } from '../../models/knowledge';
import { useEffect, useState } from 'react';
import { getKnowledgeAll } from '../../api/knowledge';
import FeaturedArticlesHeader from '../../components/FeaturedArticlesHeader/FeaturedArticlesHeader';

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
    console.log(knowledgeBase, knowledgeBase.filter((knowledge: KnowledgeBaseEntity) => !featuredKnowledgeBase.some((featured: KnowledgeBaseEntity) => featured.id === knowledge.id)).sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)));
    return (
        <div>
            <Header />
            <div>
                <FeaturedArticlesHeader articles={featuredKnowledgeBase} />
                {knowledgeBase
                    .filter((knowledge: KnowledgeBaseEntity) => !featuredKnowledgeBase.some((featured: KnowledgeBaseEntity) => featured.id === knowledge.id))
                    .filter((knowledge: KnowledgeBaseEntity) => knowledge.publishedEn)
                    .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
                    .map((knowledge: KnowledgeBaseEntity) => (
                        <div key={knowledge.id}>
                            <h2>{knowledge.titleEn}</h2>
                            <p>{knowledge.contentEn}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default KnowledgeBasePage;