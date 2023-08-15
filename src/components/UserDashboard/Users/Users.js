import React, { useEffect, useState } from 'react';
import { Button, Image, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5050/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                setLoading(false)
            })
    }, [])
    return (
        <div className="px-3 manage-users">
            <div className="cardHeader">
                <h2>Total User {users.length}</h2>
            </div>
            {loading ? <Spinner animation="border" variant="success" /> :
                users.map((user, index) => (
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="button-tooltip-2">{user.email}</Tooltip>}
                    >
                        {({ ref, ...triggerHandler }) => (
                            <Button
                                variant="light"
                                {...triggerHandler}
                                className="d-inline-flex align-items-center user-box"
                            >
                                <Image
                                    ref={ref}
                                    roundedCircle
                                    src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                                />
                                <span className="ms-1">{user.displayName}</span>
                            </Button>
                        )}
                    </OverlayTrigger>
                ))}
        </div>
    );
};

export default Users;