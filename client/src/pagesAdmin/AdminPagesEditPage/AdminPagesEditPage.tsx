import { Navigate, useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import RichTextInput from '../../components/Input/RichTextInput';
import { PageEntity } from '../../models/entities';
import { useEffect, useState } from 'react';
import ButtonColored from '../../components/Button/ButtonColored';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { getPageById, updatePage } from '../../api/page';
import './adminPagesEditPage.scss';

type Props = {
  page: 'trends';
};

const AdminPagesEditPage = ({ page }: Props) => {
  const [data, setData] = useState<PageEntity>({} as PageEntity);
  const [loaded, setLoaded] = useState(false);
  const getToken = useSilentAdminTokenRefresh();
  const navigate = useNavigate();

  useEffect(() => {
    if (!page) return;
    getToken().then((token) => {
        getPageById(token, page)
            .then((response) => {
                const dto = { id: page, ...response };
                setData(dto);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
    })
        .catch((error) => {
            console.log(error);
        });
  }, [page]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = () => {
    getToken().then((token) => {
        console.log(token);
      if (!token) return;
      updatePage(token, data)
        .then((response) => {
          console.log(response);
          navigate('/admin/pages');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  if (page === 'trends') {
    if (!loaded) return <div>Loading...</div>;
    return (
      <div className={'adminPagesEditPage'}>
        <AdminHeader />
          <p>
              Pro vytvoření kotvy, vytvořte odstavec typu "code", vložte do něj nějaký text, třeba "kotva10", poté na něj můžete odkazovat odkazem obsahem "##:~:text=kotva10".
          </p>
          <br/>
        <RichTextInput
          label={'Trends in Civic Tech (CS):'}
          name={'contentCs'}
          state={data}
          setState={setData}
        />
        <RichTextInput
          label={'Trends in Civic Tech (EN):'}
          name={'contentEn'}
          state={data}
          setState={setData}
        />
        <ButtonColored childIsLink={false} onClick={handleSave}>
          Uložit
        </ButtonColored>
      </div>
    );
  } else {
    return <Navigate to={'/admin/pages'} />;
  }
};

export default AdminPagesEditPage;
