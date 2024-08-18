import { KnowledgeBaseEntity } from '../../models/knowledge';
import { NewsEntity } from '../../models/news';

type Props = {
    articles: KnowledgeBaseEntity[] | NewsEntity[];
}

const FeaturedArticlesHeader = ({articles}: Props) => {
  return (
    <div className="featuredArticlesHeader">
      <h2>Featured Articles</h2>
        {articles.map((article) => (
            <div key={article.id}>
                <h3>{article.titleEn}</h3>
                <p>{article.contentEn}</p>
            </div>
        ))}
    </div>
  );
}

export default FeaturedArticlesHeader;