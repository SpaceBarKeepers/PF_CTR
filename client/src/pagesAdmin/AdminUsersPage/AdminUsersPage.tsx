import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSilentAdminTokenRefresh } from '../../lib/useSilentAdminTokenRefresh';
import { checkUserExists, createUser, deleteUserById, getUserAll } from '../../api/user';
import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library';
import { UserAPIEntity, UserEntity } from '../../models/entities';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import ButtonColored from '../../components/Button/ButtonColored';
import Dialog from '../../components/Dialog/Dialog';
import OrderInput from '../../components/OrderInput/OrderInput';
import { shippingCountrySelectArray } from '../../models/countries';
import { useIntl } from 'react-intl';
import './adminUsersPage.scss';
import { isEmailAddress } from '../../lib/isEmailAddress';

const AdminUsersPage = () => {
    const [users, setUsers] = useState<UserEntity[]>([]);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const getToken = useSilentAdminTokenRefresh();
    const intl = useIntl();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [organization, setOrganization] = useState('');
    const [address, setAddress] = useState('');
    const [shippingCode, setShippingCode] = useState('cz');
    const [validationError, setValidationError] = useState(intl.formatMessage({
        id: 'error_order_fill_all_required',
        defaultMessage: 'Please fill all required fields.',
    }));

    const updateUsers = () => {
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
    }

    useEffect(() => {
        updateUsers()
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

    const handleOpenDialog = () => {
        dialogRef.current?.showModal();
    };

    const handleCloseDialog = () => {
        dialogRef.current?.close();
    };

    const handleAddUser = () => {
        if (validationError) return;

        const data = {
            name,
            username: email,
            phone,
            organization,
            address,
            shippingCode,
        };

        getToken()
            .then((token) => {
                if (!token) return;
                createUser(token, data)
                    .then((response) => {
                        console.log(response);
                        handleCloseDialog()
                        updateUsers()
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
    };

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setShippingCode(e.target.value);
    };

    useEffect(() => {
        if (!name || !email || !address || !shippingCode) {
            setValidationError(intl.formatMessage({
                id: 'error_order_fill_all_required',
                defaultMessage: 'Please fill all required fields.',
            }));
            return;
        }

        if (!isEmailAddress(email)) {
            setValidationError(intl.formatMessage({
                id: 'error_order_invalid_email',
                defaultMessage: 'Invalid e-mail address.',
            }));
            return;
        }

        checkUserExists(email).then((userExists) => {
            userExists.json().then((data) => {
                if (data) {
                    setValidationError(intl.formatMessage({
                        id: 'error_order_address_already_exists',
                        defaultMessage: 'This e-mail address is already used.',
                    }));
                    return;
                }
            });
        }).then(() => {
            setValidationError('');
        });
    }, [name, email, address, shippingCode, intl]);

    return (
        <div className={'adminUsersPage'}>
            <AdminHeader />
            <ButtonColored
                type={'secondary'}
                childIsLink={false}
                onClick={handleOpenDialog}
            >
                Add user
            </ButtonColored>
            <Dialog dialogRef={dialogRef}>
                <div className={'adminUsersPage__dialogContainer'}>
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_name', defaultMessage: 'Name' })}
                        required={true}
                        state={name}
                        setState={setName}
                    />
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_email', defaultMessage: 'E-mail' })}
                        required={true}
                        state={email}
                        setState={setEmail}
                    />
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_phone', defaultMessage: 'Phone' })}
                        state={phone}
                        setState={setPhone}
                    />
                    <OrderInput
                        label={intl.formatMessage({
                            id: 'label_organization',
                            defaultMessage: 'Organization/Institution',
                        })}
                        state={organization}
                        setState={setOrganization}
                    />
                    <OrderInput
                        label={intl.formatMessage({ id: 'label_address', defaultMessage: 'Address' })}
                        required={true}
                        state={address}
                        setState={setAddress}
                    />
                    <label htmlFor={name} className={'selectLabel'}>
                        {`${intl.formatMessage({
                            id: 'label_shipping_country',
                            defaultMessage: 'Shipping country',
                        })}*`}
                        <select className={'countrySelect'} onChange={handleCountryChange}
                                value={shippingCode ?? undefined}>
                            {shippingCountrySelectArray.map((option) => {
                                    return (
                                        <option
                                            key={option.label}
                                            value={option.value || ''}
                                        >
                                            {option.label}
                                        </option>
                                    );
                                },
                            )}
                        </select>
                    </label>
                    <div className={'adminUsersPage__validationError'}>
                        {validationError}
                    </div>
                    <div className={'adminUsersPage__dialogActions'}>
                        <ButtonColored onClick={handleCloseDialog} type={'secondary'} childIsLink={false}>
                            Cancel
                        </ButtonColored>
                        <ButtonColored onClick={handleAddUser} childIsLink={false} disabled={!!validationError}>
                            Create
                        </ButtonColored>
                    </div>
                </div>
            </Dialog>
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
