import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { useEffect, useState } from 'react';
import {  FeedEntity } from '../../models/entities';
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
import { deleteFeedById, getFeedAll } from '../../api/feed';
import "./adminFeedPage.scss"

const AdminFeedPage = () => {
    const [feed, setFeed] = useState<FeedEntity[]>([]);
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate();

    const sortEventsByDate = (events: FeedEntity[]) => {
        return events.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    };

    useEffect(() => {
        getToken().then((token) => {
            getFeedAll(token)
                .then((response) => {
                    console.log(response);
                    setFeed(sortEventsByDate(response));
                })
                .catch((error) => {
                    console.log(error);
                });
        })
            .catch((error) => {
                console.log(error);
            });
}, []); //eslint-disable-line react-hooks/exhaustive-deps

    const handleRemove = (id: string) => () => {
        const confirmRemove = window.confirm(
            'Are you sure you want to remove this article?',
        );
        if (!confirmRemove) return;
        getToken().then((token) => {
            if (!token) return;
            deleteFeedById(token, id)
                .then(() => {
                    getFeedAll(token)
                        .then((response) => {
                            setFeed(sortEventsByDate(response));
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
        navigate(`/admin/feed/${id}`);
    };

    return (
        <div className={'adminFeedPage'}>
            <AdminHeader />
            <ButtonColored>
                <Link to={'/admin/feed/new'}>Add entry</Link>
            </ButtonColored>
            <Table data={{ nodes: feed }}>
                {(tableList: FeedEntity[]) => (
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
                            {tableList.map((item: FeedEntity) => (
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
                                        }).format(new Date(item.date))}
                                    </Cell>
                                    <Cell>{String(item.date)}</Cell>
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

export default AdminFeedPage;
