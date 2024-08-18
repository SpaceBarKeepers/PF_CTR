import { NewsEntity } from '../../models/news';

type Props = {
    articles: NewsEntity[];
    rowTitle?: string;
}

const ArticleRow = ({ articles, rowTitle }: Props) => {
    return (
        <div className="articleRow">
            {rowTitle && <h2>{rowTitle}</h2>}
            {articles.map((article) => (
                <div key={article.id}>
                    <h3>{article.titleEn}</h3>
                    <p>{article.contentEn}</p>
                </div>
            ))}
        </div>
    );
}

export default ArticleRow;