import React, { Component } from 'react';
import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: '',
      errors: {
        msg: ''
      }
    };
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      email: ''
    })
  }

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
    if(checktoken === null){
      return <Redirect to='/login' />
    }
    if (this.state.email) {
      return (
        <div className='container'>
          <button onClick={this.logout}>Logout</button>
          <div className='jumbotron mt-5'>
            <div className='col-sm-8 mx-auto'>
              <h1 className='text-center'>PROFILE</h1>
            </div>
            <table className='table col-md-6 mx-auto'>
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{this.state.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else return <p className='text-center jumbotron mt-5'>{this.state.errors.msg}</p>;
  }
}

export default Profile;
