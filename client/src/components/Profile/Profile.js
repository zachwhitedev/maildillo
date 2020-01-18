import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Button } from 'antd';
import AddEmail from '../AddEmail/AddEmail';
import EmailList from '../EmailList/EmailList';
import jwt_decode from 'jwt-decode';
import './Profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: '',
      errors: {
        msg: ''
      },
      emails: []
    };
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      email: '',
      emails: []
    });
  };

  addEmail = newEmail => {
    let oldList = this.state.emails;
    let newList = oldList.concat([newEmail]);
    this.setState({
      emails: newList
    });
  };

  deleteEmail = id => {
    let newList = this.state.emails.filter(email => email.id !== id);
    this.setState({
      emails: newList
    });
  };

  editEmail = id => {
    let newList = this.state.emails.map(email => {
      if (email.id === id) {
        email.edit = true;
      }
      return email;
    });
    this.setState({ emails: newList });
  };

  saveEmail = (id, newName, newColor) => {
    let newList = this.state.emails.map(email => {
      if (email.id === id) {
        email.description = newName;
        email.color = newColor;
        email.edit = false;
      }
      return email;
    });
    this.setState({ emails: newList });
  };

  componentDidMount() {
    try {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        email: decoded.email
      });
    } catch {
      this.setState({
        errors: {
          msg: 'You must be logged in to see your profile.'
        }
      });
    }
  }

  render() {
    let checktoken = localStorage.getItem('usertoken');
    if (checktoken === null) {
      return <Redirect to='/login' />;
    }
    if (this.state.email) {
      return (
        <div className='profile-container'>
          <Button id='profile-logout-btn' onClick={this.logout}>
            Logout
          </Button>
          <div className='container'>
            <div className='row'>
              <AddEmail addEmail={this.addEmail} />
              <EmailList
                emails={this.state.emails}
                deleteEmail={this.deleteEmail}
                editEmail={this.editEmail}
                saveEmail={this.saveEmail}
              />
            </div>
          </div>
        </div>
      );
    } else
      return (
        <p className='text-center jumbotron mt-5'>{this.state.errors.msg}</p>
      );
  }
}

export default Profile;
