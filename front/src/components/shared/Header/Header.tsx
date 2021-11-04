import React from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
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
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="logo512.png"
                        alt="logo"
                        className="logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/"><i className="fas fa-book icon"></i><b>&nbsp;Posts</b></Nav.Link>
                        <Nav.Link href="/photos"><i className="fas fa-camera-retro icon"></i><b>&nbsp;Photos</b></Nav.Link>
                    </Nav>

                    <Button
                        variant="danger"
                        size="lg"
                        onClick={handleLogOut}
                    >Log out</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;