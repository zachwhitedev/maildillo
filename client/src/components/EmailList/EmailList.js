import React, { useEffect } from 'react';
import EmailItem from '../EmailItem/EmailItem';
import axios from 'axios';

export default function EmailList(props) {

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
              deleteEmail={props.deleteEmail}
              editEmail={props.editEmail}
              saveEmail={props.saveEmail}
              color={email.color}
            />
          ))}
        </div>
      </div>
    );
  }
}
