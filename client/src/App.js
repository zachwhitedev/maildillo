import React, { useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import AgreementPage from './components/AgreementPage/AgreementPage';
import Dashboard from './components/Dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './App.css';

function App() {
  const [state, setState] = useState({
    isAuthenicated: false
  });

  const toggleAuthenticated = () => {
    setState({
      ...state,
      isAuthenicated: !state.isAuthenicated
    })
  }

  return (
    <Router>
      <div className='App'>
        <Switch>
        <Route
            path='/'
            exact
            render={() => {
              if (state.isAuthenicated) {
                return <Dashboard />;
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: '/login'
                    }}
                  />
                );
              }
            }}
          ></Route>
          <Route
            path='/login'
            exact
            render={() => {
              if (state.isAuthenicated) {
                return <Redirect
                to={{
                  pathname: '/dashboard'
                }}
              />
              } else {
                return <LoginPage toggleAuthenticated={toggleAuthenticated}/>
              }
            }}
          ></Route>
          <Route
            path='/register'
            exact
            render={() => {
              if (state.isAuthenicated) {
                return <Redirect
                to={{
                  pathname: '/dashboard'
                }}
              />
              } else {
                return <RegisterPage />
              }
            }}
          ></Route>
          <Route
            path='/dashboard'
            exact
            render={() => {
              if (state.isAuthenicated) {
                return <Dashboard />;
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: '/login'
                    }}
                  />
                );
              }
            }}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
