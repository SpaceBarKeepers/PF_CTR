import { KnowledgeBaseEntity } from '../../models/knowledge';
import { NewsEntity } from '../../models/news';
import "./featuredArticlesHeader.scss"
import { Link } from 'react-router-dom';

type Props = {
    articles: KnowledgeBaseEntity[] | NewsEntity[];
}

const FeaturedArticlesHeader = ({ articles }: Props) => {
    return (
        <div className="featuredArticlesHeader">
            <div className={'featuredArticlesHeader__container'}>
                {articles[0] && (
                    <Link to={`/knowledge-base/${articles[0].id}`} className={'featuredArticlesHeader__mainArticle'}>
                        <img src={articles[0].thumbnail} alt={articles[0].titleEn} />
                        <h3>{articles[0].titleEn}</h3>
                    </Link>
                )}
                <div className={'featuredArticlesHeader__sideContainer'}>
                    {articles.map((article, index) => {
                        if (index === 0) return;
                        return (
                            <Link to={`/knowledge-base/${article.id}`} className={'featuredArticlesHeader__otherArticle'} key={article.id}>
                                <h3>{article.titleEn}</h3>
                                <div className={"featuredArticlesHeader__otherArticleImage"}>
                                <img src={article.thumbnail} alt={article.titleEn} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeaturedArticlesHeader;