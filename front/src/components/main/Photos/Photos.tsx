import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

import Paginator from '../../shared/Paginator/Paginator';
import Header from '../../shared/Header/Header';
import { IPhoto } from '../../../core/interfaces/IPhotos';
import PhotosService from '../../../core/services/PhotosService';

import './styles.css';
import { logOutAction } from '../../../core/store/user/user.slice';
import DetailsPhotoModal from '../../shared/Modals/Photos/DetailsPhotoModal/DetailsPhotoModal';
import { selectPhotos } from '../../../core/store/store';
import { changeActualPageAction, changeTotalResultsAction, setPhotosAction } from '../../../core/store/photos/photos.slice';

const Photos = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [sizePage, setSizePage] = useState<number>(10);
    const [searchWithError, setSearchWithError] = useState<boolean>(false);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
    const [activePhoto, setActivePhoto] = useState<string | null>(null);

    const dispatch = useDispatch();
    const photosService: PhotosService = new PhotosService();
    const photos = useSelector(selectPhotos);

    useEffect(() => {
        if(photos.photos === []) {
            (async () => {
                await getPhotos();
            })();
        }
    }, []);

    useEffect(() => {
        (async () => {
            await getPhotos();
        })();
    }, [photos.actualPage]);

    const getPhotos = async () => {
        try {
            const result = await photosService.getPhotos(photos.actualPage, sizePage);

            dispatch(changeTotalResultsAction({ totalResults: result.data.totalResults }));
            dispatch(setPhotosAction({ photos: result.data.photos }));
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
                dispatch(changeTotalResultsAction({ totalResults: 0 }));
                dispatch(setPhotosAction({ photos: [] }));
                setSearchWithError(true);
                setLoading(false);
            }
        }
    }

    const changePage = (number: number) => {
        if (photos.actualPage !== number) {
            dispatch(changeTotalResultsAction({ totalResults: 0 }));
            dispatch(setPhotosAction({ photos: [] }));
            setSearchWithError(false);
            setLoading(true);
            dispatch(changeActualPageAction({ actualPage: number }));
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
                    <Col>
                        <h1 style={{ textAlign: 'center' }}>Photos</h1>
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
                            !loading && photos.totalResults === 0 &&
                            photos.photos === [] && !searchWithError &&
                            <Container fluid>
                                <p>No se han encontrado resultados</p>
                            </Container>
                        }

                        {
                            !loading && photos.totalResults !== 0 &&
                            photos.photos !== [] && !searchWithError &&
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
                                            photos.photos.map((photo: IPhoto) => {
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
                                    active={photos.actualPage}
                                    totalResults={photos.totalResults}
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