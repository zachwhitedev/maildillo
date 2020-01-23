import React, { useEffect } from 'react';
import EmailItem from '../EmailItem/EmailItem';

export default function EmailList(props) {

  useEffect(() => {
    props.getUserEmails();
  }, []); 
  
  //passing empty erray to replicate "componentDidMount"

  if (!props.emails.map) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className='email-list-container'>
        <div className='card'>
          <h4>Your Emails:</h4>
          {props.emails.map(email => (
            <EmailItem
              id={email._id}
              userid={email.userid}
              content={email.content}
              subject={email.subject}
              toemail={email.toemail}
              month={email.month}
              day={email.day}
              year={email.year}
              hour={email.hour}
              minutes={email.minutes}
              ampm={email.ampm}
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
