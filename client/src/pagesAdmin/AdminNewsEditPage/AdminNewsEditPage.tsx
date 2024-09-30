import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import Checkbox from '../../components/Input/Checkbox';
import RichTextInput from '../../components/Input/RichTextInput';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import './adminNewsEditPage.scss';
import ButtonColored from '../../components/Button/ButtonColored';
import SelectBox from '../../components/Input/SelectBox';
import { FeaturedPositions } from '../../models/constants';
import Image from '../../components/Input/Image';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { NewsInterface, TagEntity } from '../../models/entities';
import { createNews, getNewsById, updateNews } from '../../api/news';
import GeoTag from '../../components/Tag/GeoTag';
import { useIntl } from 'react-intl';
import CreateTag from '../../components/Tag/CreateTag';
import { getTagAll } from '../../api/tag';
import Tag from '../../components/Tag/Tag';
import { arrayContainsObject } from '../../lib/arrayContainsObject';
import DeleteTags from '../../components/Tag/DeleteTags';
import { geotagsIntl } from '../../models/tag';

const AdminNewsEditPage = () => {
    const [data, setData] = useState<NewsInterface>({} as NewsInterface);
    const [loaded, setLoaded] = useState(false);
    const [tags, setTags] = useState<TagEntity[]>([]);
    const { id } = useParams();
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate();
    const intl = useIntl();

    useEffect(() => {
        if (!id) {
            setLoaded(true);
            return
        }
        getToken().then((token) => {
            getNewsById(token, id)
                .then((response) => {
                    setData(response);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
            .catch((error) => {
                console.log(error);
            });
    }, [id]); //eslint-disable-line react-hooks/exhaustive-deps

    const updateTags = () => {
        getTagAll()
            .then((response) => {
                setTags(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        updateTags();
    }, []);

    const handleSave = () => {
        // save
        if (!id) {
            getToken()
                .then((token) => {
                    if (!token) return;
                    createNews(token, data)
                        .then((response) => {
                            console.log(response);
                            navigate('/admin/news');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        } else {
            // update
            getToken()
                .then((token) => {
                    if (!token) return;
                    updateNews(token, Number(id), data)
                        .then((response) => {
                            console.log(response);
                            navigate('/admin/news');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        }
    };

    const handleGeotagClick = (tag: string) => () => {
        setData((prev) => {
            if (prev.geotags?.includes(tag)) {
                return { ...prev, geotags: prev.geotags.filter((t) => t !== tag) };
            } else {
                return { ...prev, geotags: [...(prev.geotags || []), tag] };
            }
        });
    };

    const handleTagClick = (tag: TagEntity) => () => {
        setData((prev) => {
            if (prev.tags?.includes(tag)) {
                return { ...prev, tags: prev.tags.filter((t) => t !== tag) };
            } else {
                return { ...prev, tags: [...(prev.tags || []), tag] };
            }
        });
    };

    if (!loaded) return (<div>Loading...</div>);
    return (
        <div className={'adminNewsEditPage'}>
            <AdminHeader />
            <Checkbox
                className={'adminNewsEditPage__language'}
                label={'Publish CZ'} checked={data.publishedCs}
                setState={setData}
                name={'publishedCs'}
            />
            {data?.publishedCs &&
              <div className={'adminNewsEditPage__editor'}>
                <Input label={'Nadpis: '} state={data} setState={setData} name={'titleCs'} />
                <Input label={'Podnadpis: '} state={data} setState={setData} name={'subtitleCs'} />
                <RichTextInput label={'Článek: '} state={data} setState={setData} name={'contentCs'} />
              </div>
            }
            <Checkbox
                className={'adminNewsEditPage__language'}
                label={'Publish EN'}
                checked={data.publishedEn}
                setState={setData}
                name={'publishedEn'}
            />
            {data?.publishedEn &&
              <div className={'adminNewsEditPage__editor'}>
                <Input label={'Nadpis: '} state={data} setState={setData} name={'titleEn'} />
                <Input label={'Podnadpis: '} state={data} setState={setData} name={'subtitleEn'} />
                <RichTextInput label={'Článek: '} state={data} setState={setData} name={'contentEn'} />
              </div>
            }
            <Image label={'Thumbnail: '} state={data} setState={setData} name={'thumbnail'} />
            <SelectBox label={'Featured: '} options={FeaturedPositions} state={data} setState={setData}
                       name={'featuredPosition'} />
            <h4>Geotags:</h4>
            <div className={'adminNewsEditPage__tagContainer'}>
                {geotagsIntl.map((tag) => (
                    <GeoTag
                        key={tag.value}
                        label={intl.formatMessage({ id: tag.label, defaultMessage: tag.defaultMessage })}
                        onClick={handleGeotagClick}
                        selected={data.geotags?.includes(tag.value)}
                        value={tag.value}
                    />
                ))}
            </div>
            <h4>Tags:</h4>
            <div className={'adminNewsEditPage__tagContainer'}>
                {tags.map((tag: TagEntity) => (
                    <Tag
                        key={`tag-${tag.id}`}
                        tag={tag}
                        onClick={handleTagClick}
                        selected={data.tags ? arrayContainsObject(data.tags, tag) : false}
                    />
                ))}
                <CreateTag {...{ updateTags }} />
                <DeleteTags {...{ updateTags }} />
            </div>
            <Checkbox
                label={"Interview kategorie: "}
                setState={setData}
                name={"interview"}
                checked={data.interview}
            />
            <Checkbox
                label={"Case Study kategorie: "}
                setState={setData}
                name={"caseStudy"}
                checked={data.caseStudy}
            />
            <ButtonColored childIsLink={false} onClick={handleSave}>
                Uložit
            </ButtonColored>
        </div>
    );
};

export default AdminNewsEditPage;