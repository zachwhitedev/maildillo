import React, { useState } from 'react';
import { Button } from 'antd';

export default function AddEmail(props) {
  const [state, setState] = useState({
    description: ''
  });

  const handleChange = e => {
    setState({ [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    let emailItem = {
      description: state.description,
      id: Math.random() + 1,
      complete: false,
      edit: false,
      color: ''
    };

    props.addEmail(emailItem);
  };

  return (
    <div className='col-md-4'>
      <div className='card p-2'>
        <p id='add-email-title'>Schedule a new email:</p>
        <input
          name='description'
          value={state.description}
          onChange={(e) => handleChange(e)}
          placeholder='add your email content...'
        />
        <Button onClick={() => onSubmit()} className='btn btn-success'>
          Add
        </Button>
      </div>
    </div>
  );
}
