import { useEffect, useState } from 'react';
import { ToolEntity } from '../../models/entities';
import { useNavigate, useParams } from 'react-router-dom';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import Input from '../../components/Input/Input';
import ButtonColored from '../../components/Button/ButtonColored';
import { createTools, getToolsById, updateTools } from '../../api/tools';
import ArrayTextInput from '../../components/Input/ArrayTextInput';
import './adminToolsEditPage.scss';
import Image from '../../components/Input/Image';
import CountryInput from '../../components/Input/CountryInput';
import { accessibilityTagsIntl, socialTagsIntl } from '../../models/tag';
import GeoTag from '../../components/Tag/GeoTag';
import { useIntl } from 'react-intl';

const AdminToolsEditPage = () => {
    const [data, setData] = useState<ToolEntity>({} as ToolEntity);
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate();
    const intl = useIntl();

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

    const handleAccessibilityTagClick = (tag: string) => () => {
        setData((prev) => {
            if (prev.accessibilityTag?.includes(tag)) {
                return { ...prev, accessibilityTag: prev.accessibilityTag.filter((t) => t !== tag) };
            } else {
                return { ...prev, accessibilityTag: [...(prev.accessibilityTag || []), tag] };
            }
        });
    };

    const handleSocialTagClick = (tag: string) => () => {
        setData((prev) => {
            if (prev.socialPositioningTag?.includes(tag)) {
                return { ...prev, socialPositioningTag: prev.socialPositioningTag.filter((t) => t !== tag) };
            } else {
                return { ...prev, socialPositioningTag: [...(prev.socialPositioningTag || []), tag] };
            }
        });
    };


    if (!loaded) return (<div>Loading...</div>);
    return (
        <div className={'adminToolsEditPage'}>
            <AdminHeader />
            <Input label={'Tool name: '} state={data} setState={setData} name={'toolsName'} />
            <Image label={'Logo: '} state={data} setState={setData} name={'logo'} />
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
            <CountryInput label={'Countries: '} state={data} setState={setData} name={'countries'} />
            <Input label={'Partners: '} state={data} setState={setData} name={'partners'} />
            <div className={'adminToolsEditPage__tagContainer'}>
                {accessibilityTagsIntl.map((tag) => (
                    <GeoTag
                        key={tag.value}
                        label={intl.formatMessage({ id: tag.label, defaultMessage: tag.defaultMessage })}
                        onClick={handleAccessibilityTagClick}
                        selected={data.accessibilityTag?.includes(tag.value)}
                        value={tag.value}
                    />
                ))}
            </div>
            <div className={'adminToolsEditPage__tagContainer'}>
                {socialTagsIntl.map((tag) => (
                    <GeoTag
                        key={tag.value}
                        label={intl.formatMessage({ id: tag.label, defaultMessage: tag.defaultMessage })}
                        onClick={handleSocialTagClick}
                        selected={data.socialPositioningTag?.includes(tag.value)}
                        value={tag.value}
                    />
                ))}
            </div>
            {/*// TODO: Social positioning tag.ts*/}
            {/*// TODO: Similar tools*/}

            <ButtonColored childIsLink={false} onClick={handleSave}>
                Uložit
            </ButtonColored>
        </div>
    );
};

export default AdminToolsEditPage;