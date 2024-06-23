import React, { useEffect, useState } from 'react';
import { KnowledgeAPIEntity, KnowledgeEntity, UserAPIEntity } from '../../models/entities';
import { deleteKnowledgeById, getKnowledgeAll } from '../../api/knowledge';
import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library';
import { deleteUserByUsername, getUserAll } from '../../api/user';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

const intlOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};

type Props = {};

const AdminKnowledgePage = ({}: Props) => {
    const [articles, setArticles] = useState([]);
    const getToken = useSilentAdminTokenRefresh();


    useEffect(() => {
        getKnowledgeAll()
            .then((response) => {
                setArticles(response.map((item: KnowledgeAPIEntity) => {
                    const { _id, ...rest } = item;
                    return { id: _id, ...rest };
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleRemove = (id: string) => () => {
        getToken()
            .then((token) => {
                if (!token) return;
                deleteKnowledgeById(token, id)
                    .then(() => {
                        getKnowledgeAll(token)
                            .then((response) => {
                                setArticles(response.map((item: UserAPIEntity) => {
                                    const {_id, ...rest} = item;
                                    return {id: _id, ...rest}
                                }))
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
    }

    return (
        <div>
            <AdminHeader />
            AdminKnowledgePage
            <Table data={{ nodes: articles }}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>Title</HeaderCell>
                                <HeaderCell>Tags</HeaderCell>
                                <HeaderCell>Created</HeaderCell>
                                <HeaderCell>Edited</HeaderCell>
                                <HeaderCell>Actions</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.map((item: KnowledgeEntity) => (
                                <Row key={item.id} item={item}>
                                    <Cell>
                                        {item.cs && 'CZ: ' + item.cs.title}
                                        {item.en && 'EN: ' + item.en.title}
                                    </Cell>
                                    <Cell>
                                        {!!item.cs?.tags.length && 'CZ: ' + item.cs.tags.map((tag: string) => tag + ', ')}
                                        {!!item.en?.tags.length && 'EN: ' + item.en.tags.map((tag: string) => tag + ', ')}
                                    </Cell>
                                    <Cell>
                                        {new Intl.DateTimeFormat('cs', intlOptions).format(item.createdAt)}
                                    </Cell>
                                    <Cell>
                                        {new Intl.DateTimeFormat('cs', intlOptions).format(item.updatedAt)}
                                    </Cell>
                                    <Cell>
                                        <button type="button">
                                            Remove
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

export default AdminKnowledgePage;
