import React, { useState, useEffect } from 'react';
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
    emails: []
  });

  const updateAppState = (newState) => {
    setState(newState)
  }

  const addEmail = (newEmail) =>  {
    let oldList = state.emails;
    let newList = oldList.concat([newEmail])
    setState({
      emails: newList
    })
  }

  const deleteEmail = (id) => {
      let newList = state.emails.filter(email => email.id!==id)
      setState({
        emails: newList
        })
  };

  const editEmail = (id) => {
    let newList = state.emails.map(email => {
      if(email.id === id){
        email.edit = true;
      }
      return email;
    });
    setState({emails: newList})

  }

  const saveEmail = (id, newName, newColor) => {
    let newList = state.emails.map(email => {
      if(email.id === id){
        email.description = newName;
        email.color = newColor;
        email.edit = false;      
      }
      return email;
    });
    setState({emails: newList})
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
              <Profile addEmail={addEmail} editEmail={editEmail} saveEmail={saveEmail} deleteEmail={deleteEmail}/>
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
