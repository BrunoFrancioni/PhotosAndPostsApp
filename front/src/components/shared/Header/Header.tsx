import React from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { logOutAction } from '../../../core/store/user/user.slice';

import './styles.css';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to log out?',
            showCancelButton: true,
            confirmButtonText: `Yes`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');

                dispatch(logOutAction({ logged: false, info: null }));
            }
        });
    }

    return (
        <div className="header-container">
            <Container>
                <Row>
                    <Col lg={11}>
                        <Nav>
                            <Nav.Link href="/">
                                <div className="logo-title-container">
                                    <div>
                                        <img
                                            src="logo512.png"
                                            alt="logo"
                                            className="logo"
                                        />
                                    </div>

                                    <div>
                                        <p className="title">Photos and Pictures App</p>
                                    </div>
                                </div>
                            </Nav.Link>
                        </Nav>
                    </Col>

                    <Col>
                        <Button
                            variant="danger"
                            size="lg"
                            className="button-salir float-end"
                            onClick={handleLogOut}
                        >Log out</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header;