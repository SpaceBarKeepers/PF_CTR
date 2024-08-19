import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import { NewsEntity } from '../../models/news';
import { getNewsAll } from '../../api/news';
import { KnowledgeBaseEntity } from '../../models/knowledge';
import FeaturedArticlesHeader from '../../components/FeaturedArticlesHeader/FeaturedArticlesHeader';
import { getTagAll } from '../../api/tag';
import { geotagsIntl, TagEntity } from '../../models/tag';
import { FormattedMessage } from 'react-intl';
import ArticleRow from '../../components/ArticleRow/ArticleRow';
import './newsPage.scss';

const NewsPage = () => {
    const [news, setNews] = useState<NewsEntity[]>([]);
    const [featuredNews, setFeaturedNews] = useState<NewsEntity[]>([]);
    const [tags, setTags] = useState<TagEntity[]>([]);
    const [filteredTags, setFilteredTags] = useState<number[]>([]);
    const [filteredGeotags, setFilteredGeotags] = useState<string[]>([]);
    const [filteredNews, setFilteredNews] = useState<NewsEntity[]>([]);

    useEffect(() => {
        getNewsAll()
            .then((response) => {
                setNews(response);

                const featuredByPosition = response
                    .filter((knowledge: KnowledgeBaseEntity) => knowledge.featuredPosition !== null).sort((a: KnowledgeBaseEntity, b: KnowledgeBaseEntity) => a.featuredPosition! - b.featuredPosition!)
                    .filter((knowledge: KnowledgeBaseEntity) => knowledge.publishedEn);

                if (featuredByPosition.length < 4) {
                    const numberOfArticlesPushToFeatured = 4 - featuredByPosition.length;
                    const notFeatured = response.filter((knowledge: KnowledgeBaseEntity) => knowledge.publishedEn).filter((knowledge: KnowledgeBaseEntity) => knowledge.featuredPosition === null);
                    const sortedNotFeatured = notFeatured.sort((a: KnowledgeBaseEntity, b: KnowledgeBaseEntity) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
                    const additionalArticles = sortedNotFeatured.slice(0, numberOfArticlesPushToFeatured);

                    setFeaturedNews([...featuredByPosition, ...additionalArticles]);
                } else {
                    setFeaturedNews(featuredByPosition);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        getTagAll()
            .then((response) => {
                    setTags(response);
                },
            )
            .catch((error) => console.error(error));
    }, []);

    const handleClickTag = (tagId: number) => () => {
        if (filteredTags.includes(tagId)) {
            setFilteredTags(filteredTags.filter((id) => id !== tagId));
        } else {
            setFilteredTags([...filteredTags, tagId]);
        }
    };

    const handleClickGeotag = (geotag: string) => () => {
        if (filteredGeotags.includes(geotag)) {
            setFilteredGeotags(filteredGeotags.filter((tag) => tag !== geotag));
        } else {
            setFilteredGeotags([...filteredGeotags, geotag]);
        }
    };

    useEffect(() => {
        setFilteredNews(
            news.filter((news) => {
                if (filteredTags.length === 0) {
                    return true;
                }
                return news.tags?.some((tag) => filteredTags.includes(tag.id));
            }).filter((news) => {
                if (filteredGeotags.length === 0) {
                    return true;
                }
                return news.geoTags?.some((tag) => filteredGeotags.includes(tag));
            }),
        );
    }, [news, filteredTags, filteredGeotags]);

    const firtsRow = filteredNews
        .filter((news: NewsEntity) => !featuredNews.some((featured: NewsEntity) => featured.id === news.id))
        .filter((news: NewsEntity) => news.publishedEn);

    const interviewRow = filteredNews
        .filter((news: NewsEntity) => !featuredNews.some((featured: NewsEntity) => featured.id === news.id))
        .filter((news: NewsEntity) => news.publishedEn)
        .filter((news: NewsEntity) => news.interview);

    const caseStudyRow = filteredNews
        .filter((news: NewsEntity) => !featuredNews.some((featured: NewsEntity) => featured.id === news.id))
        .filter((news: NewsEntity) => news.publishedEn)
        .filter((news: NewsEntity) => news.caseStudy);

    return (
        <div className={'newsPage'}>
            <Header />
            <FeaturedArticlesHeader articles={featuredNews} slug={"news"} />
            <div className={'newsPage__tags'}>
                {tags.map((tag) => (
                    <div
                        className={`newsPage__tagsTag${filteredTags.includes(tag.id) ? ' newsPage__tagsTag--active' : ''}`}
                        key={tag.id}
                        onClick={handleClickTag(tag.id)}
                    >
                        <p>{tag.tagEn}</p>
                    </div>
                ))}
            </div>
            <div className={'newsPage__tags'}>
                {geotagsIntl.map((geotag) => (
                    <div
                        className={`newsPage__tagsGeotag${filteredGeotags.includes(geotag.value) ? ' newsPage__tagsGeotag--active' : ''}`}
                        key={geotag.label}
                         onClick={handleClickGeotag(geotag.value)}
                    >
                        <FormattedMessage id={geotag.label} defaultMessage={geotag.defaultMessage} />
                    </div>
                ))}
            </div>
            <ArticleRow
                articles={firtsRow}
            />
            {!!interviewRow.length && <ArticleRow
              articles={interviewRow}
              rowTitle={'Interviews'}
            />}
            {!!caseStudyRow && <ArticleRow
              articles={caseStudyRow}
              rowTitle={'Case Studies'}
            />}
        </div>
    );
};

export default NewsPage;