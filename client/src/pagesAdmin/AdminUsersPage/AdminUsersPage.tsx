import {useEffect, useState} from 'react';
import {useSilentAdminTokenRefresh} from "../../lib/useSilentAdminTokenRefresh";
import { deleteUserById, getUserAll } from '../../api/user';
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library";
import {UserAPIEntity, UserEntity} from "../../models/entities";
import AdminHeader from '../../components/AdminHeader/AdminHeader';

const AdminUsersPage = () => {
    const [users, setUsers] = useState<UserEntity[]>([])
    const getToken = useSilentAdminTokenRefresh();

    useEffect(() => {
        getToken()
            .then((token) => {
                if (!token) return;
                getUserAll(token)
                    .then((response) => {
                        setUsers(response.map((item: UserAPIEntity) => {
                            const {_id, ...rest} = item;
                            return {id: _id, ...rest}
                        }))
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleRemove = (id: number) => () => {
        getToken()
            .then((token) => {
                if (!token) return;
                deleteUserById(token, id)
                    .then(() => {
                        getUserAll(token)
                            .then((response) => {
                                setUsers(response.map((item: UserAPIEntity) => {
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
            <button>Tlačítko na přidání uživatele (až bude ready SMTP)</button>
            <Table data={{nodes: users}}>
                {(tableList: UserEntity[]) => {
                    console.log(tableList)
                    return (
                        <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCell>Username</HeaderCell>
                                    <HeaderCell>Registered via</HeaderCell>
                                    <HeaderCell>Registered</HeaderCell>
                                    <HeaderCell>Last Login</HeaderCell>
                                    <HeaderCell>Actions</HeaderCell>
                                </HeaderRow>
                            </Header>

                            <Body>
                                {tableList.map((item: UserEntity) => (
                                    <Row key={item.id} item={item}>
                                        <Cell>{item.username}</Cell>
                                        <Cell>{String(item.registrationType)}</Cell>
                                        <Cell>{String(item.registered)}</Cell>
                                        <Cell>{String(item.lastLogin)}</Cell>
                                        <Cell>
                                            <button type="button" onClick={handleRemove(item.id)}>
                                                Remove
                                            </button>
                                        </Cell>
                                    </Row>
                                ))}
                            </Body>
                        </>
                    );
                }}
            </Table>
        </div>
    );
};

export default AdminUsersPage;
