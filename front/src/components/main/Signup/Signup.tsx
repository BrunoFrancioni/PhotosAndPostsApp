import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { ICreateUsers } from '../../../core/interfaces/IUsers';
import UsersService from '../../../core/services/UsersService';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import { selectUser } from '../../../core/store/store';

import './styles.css';

const Signup = () => {
    const usersService: UsersService = new UsersService();

    const history = useHistory();

    const user = useSelector(selectUser);

    const initialState: ICreateUsers = {
        name_lastname: '',
        email: '',
        password: ''
    }

    const [loading, setLoading] = useState<boolean>(false);

    const validationSchema = yup.object().shape({
        name_lastname: yup.string().required(),
        email: yup.string().required("Required").email("Enter a valid email"),
        password: yup.string().required("Required")
    });

    const handleSubmit = async (values: ICreateUsers) => {
        setLoading(true);

        try {
            await usersService.createUser(values);

            history.push('/login');
        } catch (e: any) {
            if (e.response.status === 400) {
                Swal.fire({
                    title: 'User already exists',
                    text: 'Try with a different email',
                    icon: 'error'
                });
            } else {
                console.log("ERROR", e);

                Swal.fire({
                    title: 'An error has occurred',
                    text: 'Try again',
                    icon: 'error'
                });
            }

            setLoading(false);
        }
    }

    if (user.logged) {
        return <Redirect to="/" />;
    }

    return (
        <div className="main-card-container">
            <div className="card-container">
                <Card className="card-login">
                    <Card.Title>
                        <div className="center-container">
                            <h2>Signup</h2>
                        </div>
                    </Card.Title>

                    <Card.Body>
                        <Formik
                            initialValues={initialState}
                            validationSchema={validationSchema}
                            onSubmit={async (data, { setSubmitting }) => {
                                setSubmitting(true);

                                await handleSubmit(data);

                                setSubmitting(false);
                            }}
                        >
                            {
                                ({ values,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    touched
                                }) => (
                                    <Form
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Group
                                            controlId="name_lastname"
                                            className="position-relative"
                                        >
                                            <Form.Label>Name and Lastname</Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="name_lastname"
                                                placeholder="Enter name and lastname"
                                                defaultValue={values.name_lastname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.name_lastname && !errors.name_lastname}
                                                isInvalid={!!errors.name_lastname}
                                            />

                                            <Form.Control.Feedback
                                                type="invalid"
                                                tooltip
                                            >{errors.name_lastname}</Form.Control.Feedback>
                                        </Form.Group>

                                        <br />

                                        <Form.Group
                                            controlId="email"
                                            className="position-relative"
                                        >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="email"
                                                placeholder="Enter email"
                                                defaultValue={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.email && !errors.email}
                                                isInvalid={!!errors.email}
                                            />

                                            <Form.Control.Feedback
                                                type="invalid"
                                                tooltip
                                            >{errors.email}</Form.Control.Feedback>
                                        </Form.Group>

                                        <br />

                                        <Form.Group
                                            controlId="password"
                                            className="position-relative"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                size="lg"
                                                type="password"
                                                placeholder="Enter password"
                                                defaultValue={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isValid={touched.password && !errors.password}
                                                isInvalid={!!errors.password}
                                            />

                                            <Form.Control.Feedback
                                                type="invalid"
                                                tooltip
                                            >{errors.password}</Form.Control.Feedback>
                                        </Form.Group>

                                        <br />

                                        <div className="center-container">
                                            <Button
                                                variant="success"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Signup
                                            </Button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>

                        {
                            loading &&
                            <div className="spinner-container mb-2">
                                <Spinner animation="border" role="status">
                                </Spinner>
                            </div>
                        }

                        <p className="mt-3">In case you don't have an account, login&nbsp;
                            <a href="/login">
                                here
                            </a>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Signup;