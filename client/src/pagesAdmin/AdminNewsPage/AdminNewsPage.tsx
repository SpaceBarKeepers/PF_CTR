import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { useEffect, useState } from 'react';
import { KnowledgeEntity, NewsEntity } from '../../models/entities';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { Link, useNavigate } from 'react-router-dom';
import ButtonColored from '../../components/Button/ButtonColored';
import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library';
import { deleteNewsById, getNewsAll } from '../../api/news';
import "./adminNewsPage.scss"

const AdminNewsPage = () => {
    const [articles, setArticles] = useState<KnowledgeEntity[]>([]);
    const getToken = useSilentAdminTokenRefresh();
    const navigate = useNavigate()

    const sortArticlesByCreatedAt = (articles: KnowledgeEntity[]) => {
        return articles.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }

    useEffect(() => {
        getToken().then((token) => {
            getNewsAll(token)
                .then((response) => {
                    console.log(response);
                    setArticles(sortArticlesByCreatedAt(response));
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
        const confirmRemove = window.confirm('Are you sure you want to remove this article?');
        if (!confirmRemove) return;
        getToken()
            .then((token) => {
                if (!token) return;
                deleteNewsById(token, id)
                    .then(() => {
                        getNewsAll(token)
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
        navigate(`/admin/news/${id}`)
    };

    return (
        <div className={"adminNewsPage"}>
            <AdminHeader />
            <ButtonColored>
                <Link to={'/admin/news/new'}>
                    Add article
                </Link>
            </ButtonColored>
            <Table data={{ nodes: articles }}>
                {(tableList: NewsEntity[]) => (
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
                            {tableList.map((item: NewsEntity) => (
                                <Row key={item.id} item={item}>
                                    <Cell>
                                        {item.titleCs && 'CZ: ' + item.titleCs}
                                        {item.titleEn && 'EN: ' + item.titleEn}
                                    </Cell>
                                    <Cell>
                                        {item.featuredPosition}
                                    </Cell>
                                    <Cell>
                                        {new Intl.DateTimeFormat('cs', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        }).format(new Date(item.createdAt))}
                                    </Cell>
                                    <Cell>
                                        {new Intl.DateTimeFormat('cs', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        }).format(new Date(item.updatedAt))}
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
}

export default AdminNewsPage;