import React from 'react';
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../core/store/store';

const ProtectedRoute = ({ component: Component, path }: RouteProps) => {
    const user = useSelector(selectUser);

    if (user.logged) {
        return <Route exact component={Component} path={path} />;
    } else {
        return <Redirect push to={
            {
                pathname: "/login"
            }
        }
        />
    }
}

export default ProtectedRoute;