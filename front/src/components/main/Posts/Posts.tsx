import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { IPost } from '../../../core/interfaces/IPosts';
import PostsService from '../../../core/services/PostsService';
import { logOutAction } from '../../../core/store/user/user.slice';
import Header from '../../shared/Header/Header';
import DetailsPostModal from '../../shared/Modals/Posts/DetailsPostModal/DetailsPostModal';
import Paginator from '../../shared/Paginator/Paginator';

import './styles.css';

const Posts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [actualPage, setActualPage] = useState<number>(1);
    const [sizePage, setSizePage] = useState<number>(10);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
    const [activePost, setActivePost] = useState<string | null>(null);

    const dispatch = useDispatch();
    const postsService: PostsService = new PostsService();

    useEffect(() => {
        (async () => {
            await getPosts();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getPosts();
        })();
    }, [actualPage]);

    const getPosts = async () => {
        try {
            const result = await postsService.getPosts(actualPage, sizePage);

            setTotalResults(result.data.totalResults);
            (result.data.posts) ? setPosts(result.data.posts) : setPosts([]);
            setSearchWithError(false);

            setLoading(false);
        } catch (e: any) {
            console.log('Error getting posts', e);

            if (e.response.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    title: 'The session has expired',
                    text: 'Please start it again.',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    localStorage.removeItem('token');

                    dispatch(logOutAction({ logged: false, info: null }));
                });
            } else {
                setTotalResults(0);
                setPosts([]);
                setSearchWithError(true);
                setLoading(false);
            }
        }
    }

    const changePage = (number: number) => {
        if (actualPage !== number) {
            setTotalResults(0);
            setPosts([]);
            setSearchWithError(false);
            setLoading(true);
            setActualPage(number);
        }
    }

    const handleDetailsClick = (id: string) => {
        setActivePost(id);
        setShowDetailsModal(true);
    }

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setActivePost(null);
    }

    return (
        <>
            <Header />

            <Container>
                <Row>
                    <Col>
                        <h1 style={{ textAlign: 'center' }}>Posts</h1>
                        <hr />

                        {
                            loading &&
                            <div className="spinner-container">
                                <Spinner animation="border" role="status">
                                </Spinner>
                            </div>
                        }

                        {
                            !loading && searchWithError &&
                            <Container fluid>
                                <p>
                                    <i className="fas fa-exclamation-triangle">
                                    </i> An error has occurred. Try it again later
                                </p>
                            </Container>
                        }

                        {
                            !loading && totalResults === 0 &&
                            posts === [] && !searchWithError &&
                            <Container fluid>
                                <p>No se han encontrado resultados</p>
                            </Container>
                        }

                        {
                            !loading && totalResults !== 0 &&
                            posts !== [] && !searchWithError &&
                            <Container fluid>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Post Id</th>
                                            <th>Title</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            posts.map((post) => {
                                                return (
                                                    <tr key={post.id}>
                                                        <td>{post.userId}</td>
                                                        <td>{post.title}</td>
                                                        <td>
                                                            <div className="container-options">
                                                                <span title="See post details" className="option-span">
                                                                    <i
                                                                        className="fas fa-info-circle option"
                                                                        onClick={() => handleDetailsClick(String(post.id))}
                                                                    ></i>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>

                                <Paginator
                                    active={actualPage}
                                    totalResults={totalResults}
                                    sizePage={sizePage}
                                    changePage={changePage.bind(this)}
                                />
                            </Container>
                        }

                        {
                            showDetailsModal &&
                            <DetailsPostModal
                                showModal={showDetailsModal}
                                id={activePost}
                                handleClose={handleCloseDetailsModal}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Posts;