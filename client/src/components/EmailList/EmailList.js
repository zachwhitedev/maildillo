import React from 'react';
import EmailItem from '../EmailItem/EmailItem';

export default function EmailList (props) {

  const deleteEmail = (id) => {
    props.deleteEmail(id)
  }

  const editEmail =(id) => {
    props.editEmail(id)
  }

  const saveEmail = (id, newEmail, newColor) => {
    props.saveEmail(id, newEmail, newColor)
  }

    return (
      <div className='col-md-8'>
        <div className='card'>
          <h4>Your Emails:</h4>
        {props.emails.map(email =>
          <EmailItem 
            content={email.content}
            id={email.id}
            edit={email.edit}
            complete={email.complete}
            deleteEmail={deleteEmail}
            editEmail={editEmail}
            saveEmail={props.saveEmail}
            color={email.color}
          />
        )}
        </div>
      </div>
       
    );
}