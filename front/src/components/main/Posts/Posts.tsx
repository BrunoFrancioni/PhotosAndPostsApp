import React, { useEffect, useState } from 'react';
import { Container } from 'react-bulma-components';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { IPost } from '../../../core/interfaces/IPosts';
import PostsService from '../../../core/services/PostsService';
import { logOutAction } from '../../../core/store/user/user.slice';
import Header from '../../shared/Header/Header';

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
        if (actualPage != number) {
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

            </Container>
        </>
    );
}

export default Posts;