import { NewsEntity } from '../../models/news';
import { Link } from 'react-router-dom';
import './articleRow.scss';

type Props = {
  articles: NewsEntity[];
  rowTitle?: string;
};

const ArticleRow = ({ articles, rowTitle }: Props) => {
  return (
    <div className="articleRow">
      {rowTitle && <h2>{rowTitle}</h2>}
      <div className={'articleRow__container'}>
        {!!articles.length
          ? articles.map((article) => (
              <Link
                className={'articleRow__articleCard'}
                to={`/news/${article.id}`}
                key={article.id}
              >
                <img src={article.thumbnail} alt={article.titleEn} />
                <div className={'articleRow__articleCardLabel'}>
                  <h3>{article.titleEn}</h3>
                  <p>{article.subtitleEn}</p>
                </div>
              </Link>
            ))
          : 'No results found.'}
      </div>
    </div>
  );
};

export default ArticleRow;
