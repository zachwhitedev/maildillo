import React, { Component } from 'react';
import axios from 'axios';
import armadillo from '../../assets/armadillo.png';
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
      useremail: '',
      errors: {
        msg: ''
      },
      emails: []
    };
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      useremail: '',
      emails: []
    });
  };

  addEmail = newEmail => {
    axios.post('/addemail', newEmail).then(res => {
      console.log(res.data);
      this.setState({
        emails: res.data
      });
    })
      .catch(err => console.log(err))
  };

  updateEmail = newEmail => {
    axios.post('/updateemail', newEmail).then(res => {
      this.setState({
        emails: res
      });
    });
  };

  deleteEmail = id => {
    axios.delete(`/deleteemail/${id}`)
    .then(this.getUserEmails())
    .catch(err => console.log(err))
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

  saveEmail = (id, newName) => {
    let newList = this.state.emails.map(email => {
      if (email.id === id) {
        email.content = newName;
        email.edit = false;
      }
      return email;
    });
    this.setState({ emails: newList });
  };

  getUserEmails = () => {
    axios.get(`/getuseremails/${this.state.userid}`).then(res => {
      console.log(res);
      this.setState({
        emails: res.data
      })
    });
  };

  componentDidMount() {
    try {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        userid: decoded.userid,
        useremail: decoded.useremail
      });
      this.getUserEmails();
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
    if (this.state.useremail) {
      return (
        <div className='profile-container'>
          <img
            src={armadillo}
            alt='armadillo icon'
            id='armadillo-icon-profile'
          />
          <Button id='profile-logout-btn' onClick={this.logout}>
            Logout
          </Button>
          <div className='container'>
            <div className='row'>
              <AddEmail addEmail={this.addEmail} emails={this.state.emails} userid={this.state.userid} useremail={this.state.useremail}/>
              <EmailList
                userid={this.state.userid}
                emails={this.state.emails}
                deleteEmail={this.deleteEmail}
                editEmail={this.editEmail}
                saveEmail={this.saveEmail}
                getUserEmails={this.getUserEmails}
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
