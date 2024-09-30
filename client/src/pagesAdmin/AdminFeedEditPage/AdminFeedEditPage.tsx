import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import ButtonColored from '../../components/Button/ButtonColored';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { FeedEntity } from '../../models/entities';
import DateInput from '../../components/Input/DateInput';
import { dateStringToDate } from '../../lib/dateConversions';
import { createFeed, getFeedById, updateFeed } from '../../api/feed';
import './adminFeedEditPage.scss';

const AdminFeedEditPage = () => {
    const [data, setData] = useState<FeedEntity>({} as FeedEntity);
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            setLoaded(true);
            return;
        }
        getToken().then((token) => {
            getFeedById(token, id)
                .then((response) => {
                    const feed = { ...response, date: dateStringToDate(response.date) };
                    console.log('feed', feed);
                    setData(feed);
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

    const handleSave = () => {
        // save
        if (!id) {
            getToken()
                .then((token) => {
                    if (!token) return;
                    createFeed(token, data)
                        .then((response) => {
                            console.log(response);
                            navigate('/admin/feed');
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
                    updateFeed(token, data)
                        .then((response) => {
                            console.log(response);
                            navigate('/admin/feed');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        }
    };

    if (!loaded) return (<div>Loading...</div>);
    return (
        <div className={'adminFeedEditPage'}>
            <AdminHeader />
            <div className={'adminFeedEditPage__editor'}>
                <Input label={'Nadpis CS: '} state={data} setState={setData} name={'titleCs'} />

                <Input label={'Title EN: '} state={data} setState={setData} name={'titleEn'} />
                <DateInput label={'Datum: '} state={data} setState={setData} name={'date'} />
                <Input label={'Url: '} state={data} setState={setData} name={'url'} />
                <ButtonColored childIsLink={false} onClick={handleSave}>
                    Uložit
                </ButtonColored>
            </div>
        </div>
    );
};


export default AdminFeedEditPage;