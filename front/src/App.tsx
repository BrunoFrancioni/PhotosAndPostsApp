import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute/ProtectedRoute';
import Posts from './components/main/Posts/Posts';
import Login from './components/main/Login/Login';
import Photos from './components/main/Photos/Photos';
import Signup from './components/main/Signup/Signup';

function App() {
  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/signup'>
            <Signup />
          </Route>

          <ProtectedRoute
            component={Photos}
            path='/photos'
          />
          
          <ProtectedRoute
            component={Posts}
            path='/'
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
