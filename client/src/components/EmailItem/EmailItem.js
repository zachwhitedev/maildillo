import React, { useState } from 'react';
import { Card, Button } from 'antd';
import './EmailItem.css';

export default function EmailItem(props) {
  const [state, setState] = useState({
    newEmail: props.content,
    size: 'small'
  });

  const handleEmailChange = e => {
    setState({
      newEmail: e.target.value,
      size: 'small'
    });
  };

  if (props.edit) {
    return (
      <Card
        id='email-item-container'
        size='small'
        title='Editing email...'
        extra={<a onClick={() => props.saveEmail(props.id, state)}>Save</a>}
        style={{ width: 300 }}
        >
        <span>{props.toemail}</span><br></br>
        <span><b>{props.subject}</b></span><br></br>
        <textarea id='edit-email-textarea' onChange={handleEmailChange}>{props.content}</textarea><br></br>
        <span id='date-display'>
          {props.month + ' ' + props.day + ' ' + props.hour + ':' + props.minutes + props.ampm}
        </span>
        <br></br>
        <Button size={state.size} type='danger' id='btn' onClick={() => props.deleteEmail(props.id)}>delete</Button>
      </Card>
    );
  } else {
    return (
      <Card
        id='email-item-container'
        size='small'
        title={props.subject}
        extra={<a onClick={() => props.editEmail(props.id)}>Edit</a>}
        style={{ width: 300 }}
      >
        <span><b>to:</b> {props.toemail}</span><br></br>
        <div id='email-content-static'>
          <p id='email-content-p'>{props.content}</p>
          </div><br></br>
        <span id='date-display'>
          {props.month + '/' + props.day + ' ' + props.hour + ':' + props.minutes + props.ampm}
        </span><br></br>
        <Button size={state.size} type='danger' id='btn' onClick={() => props.deleteEmail(props.id)}>delete</Button>
      </Card>
    );
  }
}
