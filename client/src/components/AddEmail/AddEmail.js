import React, { useState } from 'react';
import { Button } from 'antd';

export default function AddEmail(props) {
  const [state, setState] = useState({
    description: '',
    priority: 1
  });

  const handleChange = e => {
    setState({ [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    let emailItem = {
      description: state.description,
      priority: state.priority,
      id: Math.random() + 1,
      complete: false,
      edit: false,
      color: ''
    };

    if (state.priority == 3) {
      emailItem.color = '#ff6161';
    } else if (state.priority == 2) {
      emailItem.color = '#ffbd7a';
    } else {
      emailItem.color = '#c2ffcc';
    }

    props.addEmail(emailItem);
  };

  return (
    <div className='col-md-4'>
      <div className='card p-2'>
        <div className='card-title'>Add Todo</div>
        <input
          name='description'
          value={state.description}
          onChange={(e) => handleChange(e)}
          placeholder='add your email content...'
        />
        <select name='priority' value={state.priority} onChange={(e) => handleChange(e)}>
          <option value={1}>Low Priority</option>
          <option value={2}>Medium Priority</option>
          <option value={3}>High Priority</option>
        </select>
        <Button onClick={() => onSubmit()} className='btn btn-success'>
          Add
        </Button>
      </div>
    </div>
  );
}
