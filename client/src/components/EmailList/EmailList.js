import React, { useEffect } from 'react';
import EmailItem from '../EmailItem/EmailItem';
import axios from 'axios';

export default function EmailList(props) {
  const deleteEmail = id => {
    props.deleteEmail(id);
  };

  const editEmail = id => {
    props.editEmail(id);
  };

  const saveEmail = (id, newEmail, newColor) => {
    props.saveEmail(id, newEmail, newColor);
  };

  useEffect(() => {
    props.getUserEmails();
  }, []); 
  
  //passing empty erray to replicate "componentDidMount"

  if (!props.emails.map) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className='col-md-8'>
        <div className='card'>
          <h4>Your Emails:</h4>
          {props.emails.map(email => (
            <EmailItem
              content={email.content}
              id={email._id}
              userid={email.userid}
              edit={email.edit}
              complete={email.complete}
              deleteEmail={deleteEmail}
              editEmail={editEmail}
              saveEmail={props.saveEmail}
              color={email.color}
            />
          ))}
        </div>
      </div>
    );
  }
}
