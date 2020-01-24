import React, { useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Profile from './components/Profile/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './App.css';

function App() {
  const [state, setState] = useState({
    isAuthenticated: false,
    useremail: '',
    userid: ''
  });

  const updateAppState = (newState) => {
    setState(newState)
  }

  return (
    <Router>
      <div className='App'>
        <Switch>
        <Route
            path='/'
            exact
            render={() => {
              if (state.isAuthenticated) {
                return <Profile />;
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
          <div className='container'>
            <Route exact path='/register' component={RegisterPage} />
            <Route path='/login' exact>
              <LoginPage updateAppState={updateAppState}/>
            </Route>
            <Route path='/profile' exact>
              <Profile />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
