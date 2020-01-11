import React from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import AgreementPage from './components/AgreementPage/AgreementPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/agreement" component={AgreementPage} />
            {/* <Route path="/register" component={RegisterPage} />
            <Route path="/something" component={Something} />
            <Route path="/support" component={Support} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
