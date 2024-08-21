import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { useEffect, useState } from 'react';
import { ToolEntity } from '../../models/entities';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { Link, useNavigate } from 'react-router-dom';
import ButtonColored from '../../components/Button/ButtonColored';
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '@table-library/react-table-library';
import { deleteToolsById, getToolsAll } from '../../api/tools';
import './adminToolsPage.scss';

const AdminToolsPage = () => {
  const [tools, setTools] = useState<ToolEntity[]>([]);
  const getToken = useSilentAdminTokenRefresh();
  const navigate = useNavigate();

  const sortToolsByName = (tools: ToolEntity[]) => {
    return tools.sort((a, b) => {
      if (a.toolsName < b.toolsName) {
        return -1;
      }
      if (a.toolsName > b.toolsName) {
        return 1;
      }
      return 0;
    });
  };

  useEffect(() => {
    getToolsAll()
      .then((response) => {
        console.log(response);
        setTools(sortToolsByName(response));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRemove = (id: string) => () => {
    const confirmRemove = window.confirm(
      'Are you sure you want to remove this article?',
    );
    if (!confirmRemove) return;
    getToken().then((token) => {
      if (!token) return;
      deleteToolsById(token, id)
        .then(() => {
          getToolsAll()
            .then((response) => {
              setTools(sortToolsByName(response));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleEdit = (id: string) => () => {
    navigate(`/admin/tools/${id}`);
  };

  return (
    <div className={'adminToolsPage'}>
      <AdminHeader />
      <ButtonColored>
        <Link to={'/admin/tools/new'}>Add tool</Link>
      </ButtonColored>
      <Table data={{ nodes: tools }}>
        {(tableList: ToolEntity[]) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Tool name</HeaderCell>
                <HeaderCell>Actions</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: ToolEntity) => (
                <Row key={item.id} item={item}>
                  <Cell>{item.toolsName}</Cell>
                  <Cell>
                    <button type="button" onClick={handleRemove(item.id)}>
                      Remove
                    </button>
                    <button type="button" onClick={handleEdit(item.id)}>
                      Edit
                    </button>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};

export default AdminToolsPage;
