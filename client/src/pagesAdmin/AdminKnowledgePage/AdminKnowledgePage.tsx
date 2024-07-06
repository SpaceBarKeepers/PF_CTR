import React, { useEffect, useState } from 'react';
import { KnowledgeAPIEntity, KnowledgeEntity, UserAPIEntity } from '../../models/entities';
import { deleteKnowledgeById, getKnowledgeAll } from '../../api/knowledge';
import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library';
import { deleteUserByUsername, getUserAll } from '../../api/user';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import ButtonColored from '../../components/Button/ButtonColored';
import { Link, useNavigate } from 'react-router-dom';

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
    const [articles, setArticles] = useState<KnowledgeEntity[]>([]);
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate()

    const sortArticlesByCreatedAt = (articles: KnowledgeEntity[]) => {
        return articles.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }

    useEffect(() => {
        getKnowledgeAll()
            .then((response) => {
                console.log(response);
                setArticles(sortArticlesByCreatedAt(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleRemove = (id: string) => () => {
        const confirmRemove = window.confirm('Are you sure you want to remove this article?');
        if (!confirmRemove) return;
        getToken()
            .then((token) => {
                if (!token) return;
                deleteKnowledgeById(token, id)
                    .then(() => {
                        getKnowledgeAll()
                            .then((response) => {
                                setArticles(sortArticlesByCreatedAt(response));
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
        navigate(`/admin/knowledge/${id}`)
    };

    return (
        <div>
            <AdminHeader />
            <ButtonColored>
                <Link to={'/admin/knowledge/new'}>
                    Add article
                </Link>
            </ButtonColored>
            <Table data={{ nodes: articles }}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>Title</HeaderCell>
                                <HeaderCell>Featured #</HeaderCell>
                                <HeaderCell>Created</HeaderCell>
                                <HeaderCell>Edited</HeaderCell>
                                <HeaderCell>Actions</HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            {tableList.map((item: KnowledgeEntity) => (
                                <Row key={item.id} item={item}>
                                    <Cell>
                                        {item.titleCs && 'CZ: ' + item.titleCs}
                                        {item.titleEn && 'EN: ' + item.titleEn}
                                    </Cell>
                                    <Cell>
                                        {item.featuredPosition}
                                    </Cell>
                                    <Cell>
                                        {new Intl.DateTimeFormat('cs', intlOptions).format(new Date(item.createdAt))}
                                    </Cell>
                                    <Cell>
                                        {new Intl.DateTimeFormat('cs', intlOptions).format(new Date(item.updatedAt))}
                                    </Cell>
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

export default AdminKnowledgePage;
