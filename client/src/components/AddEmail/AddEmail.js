import React, { useState } from 'react';
import { Button } from 'antd';
import './AddEmail.css';

export default function AddEmail(props) {
  const [state, setState] = useState({
    description: '',
    size: 'small'
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if(props.emails.length >= 3){
        alert('You have exceeded the limit of 3 emails per free account. Please upgrade to premium account to schedule more emails.')
        return;
    }
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
        <Button onClick={() => onSubmit()} id='addemail-btn' size={state.size}>
          Add
        </Button>
      </div>
    </div>
  );
}
