import { useEffect, useState } from 'react';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { deleteUserById, getUserAll } from '../../api/user';
import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library';
import { UserAPIEntity, UserEntity } from '../../models/entities';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import ButtonColored from '../../components/Button/ButtonColored';

const AdminUsersPage = () => {
    const [users, setUsers] = useState<UserEntity[]>([]);
    // const [addUserDialodOpen, setAddUserDialogOpen] = useState(false);
    // const dialogRef = useRef<HTMLDialogElement>(null);
    const getToken = useSilentAdminTokenRefresh();

    useEffect(() => {
        getToken()
            .then((token) => {
                if (!token) return;
                getUserAll(token)
                    .then((response) => {
                        setUsers(response.map((item: UserAPIEntity) => {
                            const { _id, ...rest } = item;
                            return { id: _id, ...rest };
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleRemove = (id: number) => () => {
        const confirmRemove = window.confirm('Are you sure you want to remove this user?');
        if (!confirmRemove) return;
        getToken()
            .then((token) => {
                if (!token) return;
                deleteUserById(token, id)
                    .then(() => {
                        getUserAll(token)
                            .then((response) => {
                                setUsers(response.map((item: UserAPIEntity) => {
                                    const { _id, ...rest } = item;
                                    return { id: _id, ...rest };
                                }));
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

    // const handleOpenDialog = () => {
    //     setAddUserDialogOpen(true);
    // };

    return (
        <div>
            <AdminHeader />
            <ButtonColored
                type={'secondary'}
                childIsLink={false}
                // onClick={handleOpenDialog}
            >
                Add user
            </ButtonColored>
            {/*<Dialog dialogRef={dialogRef}>*/}
            {/*  <div>askhjbdjhsdfvjhsdgfv dsa</div>*/}
            {/*</Dialog>*/}
            <Table data={{ nodes: users }}>
                {(tableList: UserEntity[]) => {
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
