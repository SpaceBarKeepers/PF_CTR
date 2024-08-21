import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { useEffect, useState } from 'react';
import { EventEntity } from '../../models/entities';
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
import { deleteEventById, getEventsAll } from '../../api/events';
import './adminEventsPage.scss';

const AdminEventsPage = () => {
  const [events, setEvents] = useState<EventEntity[]>([]);
  const getToken = useSilentAdminTokenRefresh();
  const navigate = useNavigate();

  const sortEventsByDate = (events: EventEntity[]) => {
    return events.sort((a, b) => {
      return new Date(b.eventAt).getTime() - new Date(a.eventAt).getTime();
    });
  };

  useEffect(() => {
    getEventsAll()
      .then((response) => {
        console.log(response);
        setEvents(sortEventsByDate(response));
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
      deleteEventById(token, id)
        .then(() => {
          getEventsAll()
            .then((response) => {
              setEvents(sortEventsByDate(response));
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
    navigate(`/admin/events/${id}`);
  };

  return (
    <div className={'adminEventsPage'}>
      <AdminHeader />
      <ButtonColored>
        <Link to={'/admin/events/new'}>Add event</Link>
      </ButtonColored>
      <Table data={{ nodes: events }}>
        {(tableList: EventEntity[]) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Title</HeaderCell>
                <HeaderCell>Event date</HeaderCell>
                <HeaderCell>Event time</HeaderCell>
                <HeaderCell>Actions</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item: EventEntity) => (
                <Row key={item.id} item={item}>
                  <Cell>
                    {item.titleCs && 'CZ: ' + item.titleCs}
                    {item.titleEn && 'EN: ' + item.titleEn}
                  </Cell>
                  <Cell>
                    {new Intl.DateTimeFormat('cs', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }).format(new Date(item.eventAt))}
                  </Cell>
                  <Cell>{item.eventTimeAt}</Cell>
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

export default AdminEventsPage;
