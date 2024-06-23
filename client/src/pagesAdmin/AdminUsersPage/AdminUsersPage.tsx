import {useEffect, useState} from 'react';
import {useSilentAdminTokenRefresh} from "../../lib/useSilentAdminTokenRefresh";
import {deleteUserByUsername, getUserAll} from "../../api/user";
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table} from "@table-library/react-table-library";
import {UserAPIEntity, UserEntity} from "../../models/entities";

type Props = {};

const AdminUsersPage = ({}: Props) => {
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
    }, []);

    const handleRemove = (username: string) => () => {
        getToken()
            .then((token) => {
                if (!token) return;
                deleteUserByUsername(token, username)
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
            <button>Tlačítko na přidání uživatele (až bude ready SMTP)</button>
            <Table data={{nodes: users}}>
                {(tableList: UserEntity[]) => {
                    console.log(tableList)
                    return (
                        <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCell>Username</HeaderCell>
                                    <HeaderCell>Actions</HeaderCell>
                                </HeaderRow>
                            </Header>

                            <Body>
                                {tableList.map((item) => (
                                    <Row key={item.id} item={item}>
                                        <Cell>{item.username}</Cell>
                                        <Cell>
                                            <button type="button" onClick={handleRemove(item.username)}>
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
