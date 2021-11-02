import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

import Paginator from '../../shared/Paginator/Paginator';
import Header from '../../shared/Header/Header';
import Sidebar from '../../shared/Sidebar/Sidebar';
import { IPhoto } from '../../../core/interfaces/IPhotos';
import PhotosService from '../../../core/services/PhotosService';

import './styles.css';
import { logOutAction } from '../../../core/store/user/user.slice';
import DetailsPhotoModal from '../../shared/Modals/Photos/DetailsPhotoModal/DetailsPhotoModal';

const Photos = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [actualPage, setActualPage] = useState<number>(1);
    const [sizePage, setSizePage] = useState<number>(10);
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
    const [activePhoto, setActivePhoto] = useState<string | null>(null);

    const dispatch = useDispatch();
    const photosService: PhotosService = new PhotosService();

    useEffect(() => {
        (async () => {
            await getPhotos();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await getPhotos();
        })();
    }, [actualPage]);

    const getPhotos = async () => {
        try {
            const result = await photosService.getPhotos(actualPage, sizePage);

            setTotalResults(result.data.totalResults);
            (result.data.photos) ? setPhotos(result.data.photos) : setPhotos([]);
            setSearchWithError(false);

            setLoading(false);
        } catch (e: any) {
            console.log('Error getting photos', e);

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
                setPhotos([]);
                setSearchWithError(true);
                setLoading(false);
            }
        }
    }

    const changePage = (number: number) => {
        if (actualPage !== number) {
            setTotalResults(0);
            setPhotos([]);
            setSearchWithError(false);
            setLoading(true);
            setActualPage(number);
        }
    }

    const handleDetailsClick = (id: string) => {
        setActivePhoto(id);
        setShowDetailsModal(true);
    }

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setActivePhoto(null);
    }

    return (
        <>
            <Header />

            <Container>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>

                    <Col>
                        <h1>Photos</h1>
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
                            photos === [] && !searchWithError &&
                            <Container fluid>
                                <p>No se han encontrado resultados</p>
                            </Container>
                        }

                        {
                            !loading && totalResults !== 0 &&
                            photos !== [] && !searchWithError &&
                            <Container fluid>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Album Id</th>
                                            <th>Title</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            photos.map((photo) => {
                                                return (
                                                    <tr key={photo.id}>
                                                        <td>{photo.albumId}</td>
                                                        <td>{photo.title}</td>
                                                        <td>
                                                            <div className="container-options">
                                                                <span title="See photo details" className="option-span">
                                                                    <i
                                                                        className="fas fa-info-circle option"
                                                                        onClick={() => handleDetailsClick(String(photo.id))}
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
                            <DetailsPhotoModal
                                showModal={showDetailsModal}
                                id={activePhoto}
                                handleClose={handleCloseDetailsModal}
                            />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Photos;