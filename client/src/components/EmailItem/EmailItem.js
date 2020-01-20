import React, { useState } from 'react';
import { Card, Button } from 'antd';
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
        extra={<a onClick={() =>
            props.saveEmail(props.id, state)}>Save</a>}
        style={{ width: 300 }}
      >
        <textarea
          onChange={handleEmailChange}
        >
          {props.content}
        </textarea>
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
        <li style={{ backgroundColor: props.color }}>{props.content}</li>
        <Button onClick={() => props.deleteEmail(props.id)}>delete</Button>
      </Card>
    );
  }
}
