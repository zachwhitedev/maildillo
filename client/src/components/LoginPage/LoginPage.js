import React, { setState } from 'react';
import { Link } from 'react-router-dom';
import armadillo from '../../assets/armadillo.png';
import './LoginPage.css';
import axios from 'axios';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

class NormalLoginForm extends React.Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = this.state;
        const user = {
          email,
          password
        };
        axios
          .post('/login', user)
          // .then(res => 
          //   this.setState({
          //   email: res.data.email,
          //   message: res.data.message
          // }))
          .then(res => console.log('Check it out: ' + res.data))
          .catch(err => console.log(err));
      }
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }]
          })(
            <Input
              prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Email'
              name='email'
              onChange={this.onChange}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              name='password'
              placeholder='Password'
              onChange={this.onChange}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);

export default function LoginPage() {
  return (
    <div id='loginpage-container'>
      <img src={armadillo} alt='armadillo icon' id='armadillo-icon'/>
      <h4 id='login-slug'>Schedule emails in your browser.</h4>
      <WrappedNormalLoginForm />
     <span id='asiteby'>a service by <a href='https://www.zachwhite.dev/' target='_blank'>Zach White</a></span>
    </div>
  );
}
