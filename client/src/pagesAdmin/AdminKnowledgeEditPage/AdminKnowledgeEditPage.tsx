import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import Checkbox from '../../components/Input/Checkbox';
import RichTextInput from '../../components/Input/RichTextInput';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import './adminKnowledgeEditPage.scss';
import ButtonColored from '../../components/Button/ButtonColored';
import { createKnowledge, getKnowledgeById, updateKnowledge } from '../../api/knowledge';
import SelectBox from '../../components/Input/SelectBox';
import { FeaturedPositions } from '../../models/constants';
import Image from '../../components/Input/Image';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { KnowledgeBaseInterface } from '../../models/entities';

const AdminKnowledgeEditPage = () => {
    const [data, setData] = useState<KnowledgeBaseInterface>({} as KnowledgeBaseInterface);
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            setLoaded(true);
            return
        }
        getToken().then((token) => {
            getKnowledgeById(token, id)
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

    const handleSave = () => {
        // save
        if (!id) {
            getToken()
                .then((token) => {
                    if (!token) return;
                    createKnowledge(token, data)
                        .then((response) => {
                            console.log(response);
                            navigate("/admin/knowledge")
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
                    updateKnowledge(token, Number(id), data)
                        .then((response) => {
                            console.log(response);
                            navigate("/admin/knowledge")
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        }
    };

    if (!loaded) return (<div>Loading...</div>);
    return (
        <div className={'adminKnowledgeEditPage'}>
            <AdminHeader />
            <Checkbox
                className={'adminKnowledgeEditPage__language'}
                label={'Publish CZ'} checked={data.publishedCs}
                setState={setData}
                name={'publishedCs'}
            />
            {data?.publishedCs &&
              <div className={'adminKnowledgeEditPage__editor'}>
                <Input label={'Nadpis: '} state={data} setState={setData} name={'titleCs'} />
                <Input label={'Podnadpis: '} state={data} setState={setData} name={'subtitleCs'} />
                <RichTextInput label={'Článek: '} state={data} setState={setData} name={'contentCs'} />
              </div>
            }
            <Checkbox
                className={'adminKnowledgeEditPage__language'}
                label={'Publish EN'}
                checked={data.publishedEn}
                setState={setData}
                name={'publishedEn'}
            />
            {data?.publishedEn &&
              <div className={'adminKnowledgeEditPage__editor'}>
                <Input label={'Nadpis: '} state={data} setState={setData} name={'titleEn'} />
                <Input label={'Podnadpis: '} state={data} setState={setData} name={'subtitleEn'} />
                <RichTextInput label={'Článek: '} state={data} setState={setData} name={'contentEn'} />
              </div>
            }
            <Image label={'Thumbnail: '} state={data} setState={setData} name={'thumbnail'} />
            <SelectBox label={'Featured: '} options={FeaturedPositions} state={data} setState={setData}
                       name={'featuredPosition'} />
            <ButtonColored childIsLink={false} onClick={handleSave}>
                Uložit
            </ButtonColored>
        </div>
    );
};

export default AdminKnowledgeEditPage;