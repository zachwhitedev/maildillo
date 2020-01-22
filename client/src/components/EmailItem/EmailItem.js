import React, { useState } from 'react';
import { Card, Button, Input } from 'antd';
import './EmailItem.css';

export default function EmailItem(props) {
  const [state, setState] = useState({
    newEmail: props.content
  });

  const handleEmailChange = e => {
    setState({
      newEmail: e.target.value
    });
  };

  if (props.edit) {
    return (
      <Card
        size='small'
        title='Editing email...'
        extra={<a onClick={() => props.saveEmail(props.id, state)}>Save</a>}
        style={{ width: 300 }}
        >
        <span>{props.toemail}</span><br></br>
        <span><b>{props.subject}</b></span><br></br>
        <textarea id='edit-email-textarea' onChange={handleEmailChange}>{props.content}</textarea><br></br>
        <span>
          {props.month + ' ' + props.day + ' ' + props.hour + ':' + props.minutes + props.ampm}
        </span>
        <br></br>
        <Button onClick={() => props.deleteEmail(props.id)}>delete</Button>
      </Card>
    );
  } else {
    return (
      <Card
        size='small'
        title='Email:'
        extra={<a onClick={() => props.editEmail(props.id)}>Edit</a>}
        style={{ width: 300 }}
      >
        <span><b>to:</b> {props.toemail}</span><br></br>
        <span><b>{props.subject}</b></span><br></br>
        <div id='email-content-static'>
          <p id='email-content-p'>{props.content}</p>
          </div><br></br>
        <span>
          {props.month + ' ' + props.day + ' ' + props.hour + ':' + props.minutes + props.ampm}
        </span><br></br>
        <Button onClick={() => props.deleteEmail(props.id)}>delete</Button>
      </Card>
    );
  }
}
