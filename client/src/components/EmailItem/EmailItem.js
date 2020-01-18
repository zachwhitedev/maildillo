import React, { useState } from 'react';
import { Card } from 'antd';
import './EmailItem.css';

export default function EmailItem(props) {
  const [state, setState] = useState({
    newEmail: props.description,
    newColor: props.color
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
            props.saveEmail(props.id, state.newEmail, state.newColor)}>Save</a>}
        style={{ width: 300 }}
      >
        <textarea
          style={{ backgroundColor: props.color }}
          onChange={handleEmailChange}
        >
          {props.description}
        </textarea>
        <br></br>
        <button onClick={() => props.deleteEmail(props.id)}>delete</button>
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
        <li style={{ backgroundColor: props.color }}>{props.description}</li>
        <button onClick={() => props.deleteEmail(props.id)}>delete</button>
      </Card>
    );
  }
}
