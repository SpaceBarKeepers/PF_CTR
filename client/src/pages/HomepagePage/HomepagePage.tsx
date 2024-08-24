import LayoutPublicWrapper from '../../wrappers/LayoutPrivateWrapper';
import HomepageCard from '../../components/HomepageCard/HomepageCard';
import "./homepagePage.scss"
import { useEffect, useState } from 'react';
import { getNewsAll } from '../../api/news';
import { NewsEntity } from '../../models/news';
import ArticleRow from '../../components/ArticleRow/ArticleRow';
import Calendar from '../../components/Calendar/Calendar';
import { useNavigate } from 'react-router-dom';

const HomepagePage = () => {
    const [news, setNews] = useState<NewsEntity[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getNewsAll()
            .then((response) => {
                setNews(response.sort((a: NewsEntity, b:NewsEntity) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3));
            })
            .catch((error) => console.error(error));
    }, []);

    const handleCardClick = (path: string) => () => {
        navigate(path);
    }

    return (
        <LayoutPublicWrapper>
            <div className={'homepage'}>
                <div className={'homepage__top'}>
                    <div className={'homepage__topTop'}>
                        <div className={'homepage__topTopLeft'}>
                            <h1>Civic Tech Market Report 2025</h1>
                            <HomepageCard
                                color={'#EA7200'}
                                title={'Catalogue of tools'}
                                description={'Browse through the database of Civic Tech tools available on the European market.'}
                                icon={'/icons/icon_catalogue.svg'}
                                size={'large'}
                                onClick={handleCardClick('/catalogue')}
                            />
                        </div>
                        <div className={'homepage__topTopFeed'}>
                            Feed
                        </div>
                    </div>
                    <div className={'homepage__topBottom'}>
                        <HomepageCard
                            color={'#E22119'}
                            title={'Trends'}
                            description={'See the latest trends and key data on the Civic Tech market.'}
                            icon={'/icons/icon_trends.svg'}
                            onClick={handleCardClick('/trends')}
                        />
                        <HomepageCard
                            color={'#005A00'}
                            title={'Knowledge Base'}
                            description={'Explore the core knowledge about the Civic Tech ecosystem.'}
                            icon={'/icons/icon_knowledge.svg'}
                            onClick={handleCardClick('/knowledge-base')}
                        />
                        <HomepageCard
                            color={'#006D75'}
                            title={'News'}
                            description={'Catch up on the latest developments in the industry and the field of participation.'}
                            icon={'/icons/icon_news.svg'}
                            onClick={handleCardClick('/news')}
                        />
                    </div>
                </div>
                <ArticleRow articles={news} />
                <h2>Industry events</h2>
                <Calendar />
            </div>
        </LayoutPublicWrapper>
    );
};

export default HomepagePage;
