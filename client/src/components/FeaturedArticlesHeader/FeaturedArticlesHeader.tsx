import { KnowledgeBaseEntity } from '../../models/knowledge';

type Props = {
    articles: KnowledgeBaseEntity[];
}

const FeaturedArticlesHeader = ({articles}: Props) => {
  return (
    <div className="featuredArticlesHeader">
      <h2>Featured Articles</h2>
        {articles.map((article: KnowledgeBaseEntity) => (
            <div key={article.id}>
                <h3>{article.titleEn}</h3>
                <p>{article.contentEn}</p>
            </div>
        ))}
    </div>
  );
}

export default FeaturedArticlesHeader;