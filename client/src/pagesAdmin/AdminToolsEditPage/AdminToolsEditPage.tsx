import { useEffect, useState } from 'react';
import { ToolEntity } from '../../models/entities';
import { useNavigate, useParams } from 'react-router-dom';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import Input from '../../components/Input/Input';
import ButtonColored from '../../components/Button/ButtonColored';
import { createTools, getToolsById, updateTools } from '../../api/tools';
import ArrayTextInput from '../../components/Input/ArrayTextInput';
import "./adminToolsEditPage.scss"

const AdminToolsEditPage = () => {
    const [data, setData] = useState<ToolEntity>({} as ToolEntity);
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            setLoaded(true);
            return;
        }
        getToolsById(id)
            .then((response) => {
                setData(response);
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
                    createTools(token, data)
                        .then((response) => {
                            console.log(response);
                            navigate('/admin/tools');
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
                    updateTools(token, data)
                        .then((response) => {
                            console.log(response);
                            navigate('/admin/tools');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
        }
    };

    if (!loaded) return (<div>Loading...</div>);
    return (
        <div className={'adminToolsEditPage'}>
            <AdminHeader />
            <Input label={'Tool name: '} state={data} setState={setData} name={'toolsName'} />
            <div className={'adminToolsEditPage__dualLangBox'}>
                <Input label={'Description EN: '} state={data} setState={setData} name={'descEn'} />
                <Input label={'Popis CS: '} state={data} setState={setData} name={'descCS'} />
            </div>
            <div className={'adminToolsEditPage__dualLangBox'}>
                <ArrayTextInput label={'Features EN: '} state={data} setState={setData} name={'featuresEn'} />
                <ArrayTextInput label={'Vlastnosti CS: '} state={data} setState={setData} name={'featuresCs'} />
            </div>
            <div className={'adminToolsEditPage__dualLangBox'}>
                <Input label={'Data Protection EN: '} state={data} setState={setData} name={'dataProtectionEn'} />
                <Input label={'Ochrana dat CS: '} state={data} setState={setData} name={'dataProtectionCs'} />
            </div>
            <div className={'adminToolsEditPage__dualLangBox'}>
                <Input label={'Authentication EN: '} state={data} setState={setData} name={'authenticationEn'} />
                <Input label={'Autentikace CS: '} state={data} setState={setData} name={'authenticationCs'} />
            </div>
            <div className={'adminToolsEditPage__dualLangBox'}>
                <Input label={'Next product update EN: '} state={data} setState={setData}
                       name={'nextProductUpdateEn'} />
                <Input label={'Produktový update CS: '} state={data} setState={setData} name={'nextProductUpdateCs'} />
            </div>
            <div className={'adminToolsEditPage__dualLangBox'}>
                <ArrayTextInput label={'Feed EN: '} state={data} setState={setData} name={'feedEn'} />
                <ArrayTextInput label={'Feed CS: '} state={data} setState={setData} name={'feedEn'} />
            </div>
            <Input label={'Established: '} state={data} setState={setData} name={'established'} />
            <Input label={'Number of clients: '} state={data} setState={setData} name={'noOfClients'} />
            <Input label={'Team: '} state={data} setState={setData} name={'team'} />
            <Input label={'Email: '} state={data} setState={setData} name={'email'} />
            <Input label={'Phone: '} state={data} setState={setData} name={'phone'} />
            <Input label={'Web: '} state={data} setState={setData} name={'web'} />
            <Input label={'Team: '} state={data} setState={setData} name={'team'} />
            {/*// TODO: Array select countries*/}
            <Input label={'Partners: '} state={data} setState={setData} name={'partners'} />
            {/*// TODO: Accesibility tag.ts*/}
            {/*// TODO: Social positioning tag.ts*/}
            {/*// TODO: Accesibility tag.ts*/}
            {/*// TODO: Similar tools*/}

            <ButtonColored childIsLink={false} onClick={handleSave}>
                Uložit
            </ButtonColored>
        </div>
    );
};

export default AdminToolsEditPage;