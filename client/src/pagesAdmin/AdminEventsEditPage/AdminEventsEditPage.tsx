import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import Checkbox from '../../components/Input/Checkbox';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import './adminEventsEditPage.scss';
import ButtonColored from '../../components/Button/ButtonColored';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { EventEntity } from '../../models/entities';
import { createEvent, getEventById, updateEvent } from '../../api/events';
import DateInput from '../../components/Input/DateInput';
import TimeInput from '../../components/Input/TimeInput';
import { dateStringToDate } from '../../lib/dateConversions';

const AdminEventsEditPage = () => {
    const [data, setData] = useState<EventEntity>({} as EventEntity);
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            setLoaded(true);
            return
        }
        getEventById(id)
            .then((response) => {
                const event = {...response, eventAt: dateStringToDate(response.eventAt)};
                console.log("event", event)
                setData(event);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleSave = () => {
        // save
        if (!id) {
            getToken()
                .then((token) => {
                    if (!token) return;
                    createEvent(token, data)
                        .then((response) => {
                            console.log(response);
                            navigate("/admin/events")
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
                    updateEvent(token, data)
                        .then((response) => {
                            console.log(response);
                            navigate("/admin/events")
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        }
    };

    if (!loaded) return (<div>Loading...</div>);
    return (
        <div className={'adminEventsEditPage'}>
            <AdminHeader />
            <Checkbox
                className={'adminEventsEditPage__language'}
                label={'Publish CZ'} checked={data.publishedCs}
                setState={setData}
                name={'publishedCs'}
            />
            {data?.publishedCs &&
              <div className={'adminEventsEditPage__editor'}>
                <Input label={'Nadpis: '} state={data} setState={setData} name={'titleCs'} />
              </div>
            }
            <Checkbox
                className={'adminEventsEditPage__language'}
                label={'Publish EN'}
                checked={data.publishedEn}
                setState={setData}
                name={'publishedEn'}
            />
            {data?.publishedEn &&
              <div className={'adminEventsEditPage__editor'}>
                <Input label={'Nadpis: '} state={data} setState={setData} name={'titleEn'} />
              </div>
            }
            <DateInput label={'Datum: '} state={data} setState={setData} name={'eventAt'} />
            <TimeInput label={'Čas: '} state={data} setState={setData} name={'eventTimeAt'} />
            <Input label={'Lokace: '} state={data} setState={setData} name={'location'} />
            <ButtonColored childIsLink={false} onClick={handleSave}>
                Uložit
            </ButtonColored>
        </div>
    );
};

export default AdminEventsEditPage;