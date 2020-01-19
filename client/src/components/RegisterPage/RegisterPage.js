import React, { setState, useEffect } from 'react';
import armadillo from '../../assets/armadillo.png';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import AgreementPage from '../AgreementPage/AgreementPage';
import './RegisterPage.css';
import axios from 'axios';

import { Form, Input, Checkbox, Button, AutoComplete, Icon } from 'antd';

const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    showAgreement: false,
    email: '',
    password: '',
    msg: '',
    redirect: false
  };

  ////////////////// fun zone //////////////////////

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const user = {
          email: this.state.email,
          password: this.state.password
        };
        axios
          .post('/register', user)
          .then(res => {
            if (res.data.error) {
              this.setState({
                msg: res.data.error
              });
            } else {
              console.log(res);
              this.setState({ redirect: true });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ msg: null });
  };

  /////////////////////////////////////////

  hideAgreement = () => {
    this.setState({ showAgreement: false });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/login' />;
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, autoCompleteResult } = this.props.form;
    const usernameError = isFieldTouched('username') && getFieldError('username');

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <img src={armadillo} alt='armadillo icon' id='armadillo-icon-register' />

        <Form.Item label='E-mail'>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail.'
              },
              {
                required: true,
                message: 'Please input your E-mail.'
              }
            ]
          })(<Input onChange={this.onChange} name='email' placeholder='email@example.com'/>)}
        </Form.Item>
        <Form.Item label='Password' hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password onChange={this.onChange} name='password' />)}
        </Form.Item>
        <Form.Item label='Confirm Password'>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          <span style={{ color: 'red' }}>{this.state.msg}</span>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked'
          })(
            <Checkbox>
              I have read the{' '}
              <a
                onClick={() => {
                  this.setState({ showAgreement: !this.state.showAgreement });
                }}
              >
                agreement
              </a>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Link to='/'>
            <Button>Home</Button>
          </Link>
        </Form.Item>
        {this.state.showAgreement && (
          <AgreementPage toggleAgreement={this.hideAgreement} />
        )}
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(
  RegistrationForm
);

export default function RegisterPage(props) {
  return (
    <div id='registerpage-container'>
      <WrappedRegistrationForm
        updateAppState={props.updateAppState}
        token={props.token}
      />
    </div>
  );
}
