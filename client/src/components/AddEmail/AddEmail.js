import React, { useState } from 'react';
import { Button, Input } from 'antd';
import './AddEmail.css';

export default function AddEmail(props) {
  const [state, setState] = useState({
    userid: props.userid,
    useremail: props.useremail,
    toemail: 'You must add a recipient email.',
    subject: '[no subject]',
    content: 'No content was added to this email.',
    month: '12',
    day: '1',
    year: '',
    hour: '12',
    minutes: '00',
    ampm: 'am',
    size: 'small'
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (props.emails.length >= 3) {
      alert(
        'You have exceeded the limit of 3 emails per free account. Please upgrade to premium account to schedule more emails.'
      );
      return;
    }
    const newEmail = {
      userid: props.userid,
      useremail: props.useremail,
      toemail: state.toemail,
      subject: state.subject,
      content: state.content,
      month: state.month,
      day: state.day,
      year: state.year,
      hour: state.hour,
      minutes: state.minutes,
      ampm: state.ampm,
      complete: false,
      edit: false,
    };

    props.addEmail(newEmail);
  };

  return (
      <div id='addemail-container'>
        <p id='addemail-title'>Schedule a new email:</p>
        <Input
          type='text'
          name='toemail'
          onChange={e => handleChange(e)}
          placeholder='recipient@example.com'
        />
        <Input
          type='text'
          name='subject'
          onChange={e => handleChange(e)}
          placeholder='Subject'
        />
        <Input.TextArea
          rows={6}
          onChange={e => handleChange(e)}
          name='content'
          placeholder='Dear Person, I am writing to you because...'
        ></Input.TextArea>
        <br></br>
        <div id='email-date-inputs'>
          <select
            name='month'
            onChange={e => handleChange(e)}
          >
            <option selected disabled hidden>
              Month
            </option>
            <option value='Jan'>January</option>
            <option value='Feb'>February</option>
            <option value='Mar'>March</option>
            <option value='Apr'>April</option>
            <option value='May'>May</option>
            <option value='Jun'>June</option>
            <option value='Jul'>July</option>
            <option value='Aug'>August</option>
            <option value='Sep'>September</option>
            <option value='Oct'>October</option>
            <option value='Nov'>November</option>
            <option value='Dec'>December</option>
          </select>
          <select name='day' onChange={e => handleChange(e)} value={state.day}>
            <option selected disabled hidden>
              Day
            </option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option value='13'>13</option>
            <option value='14'>14</option>
            <option value='15'>15</option>
            <option value='16'>16</option>
            <option value='17'>17</option>
            <option value='18'>18</option>
            <option value='19'>19</option>
            <option value='20'>20</option>
            <option value='21'>21</option>
            <option value='22'>22</option>
            <option value='23'>23</option>
            <option value='24'>24</option>
            <option value='25'>25</option>
            <option value='26'>26</option>
            <option value='27'>27</option>
            <option value='28'>28</option>
            <option value='29'>29</option>
            <option value='30'>30</option>
            <option value='31'>31</option>
          </select>
          <select
            name='year'
            onChange={e => handleChange(e)}
          >
            <option value='' selected disabled hidden>
              Year
            </option>
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
            <option value='2025'>2025</option>
          </select>
        </div>
        <div id='email-time-inputs'>
          <select
            name='hour'
            onChange={e => handleChange(e)}
            value={state.hour}
          >
            <option value='12'>12</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
          </select>
          <select
            name='minutes'
            onChange={e => handleChange(e)}
            value={state.minutes}
          >
            <option value='00'>00</option>
            <option value='15'>15</option>
            <option value='30'>30</option>
            <option value='45'>45</option>
          </select>
          <select name='ampm' id='ampm' value={state.ampm} onChange={e => handleChange(e)}>
            <option value='am'>am</option>
            <option value='pm'>pm</option>
          </select>
          <span id='pst'>PST</span>
        </div>
        <Button onClick={() => onSubmit()} id='addemail-btn' size={state.size}>
          Add
        </Button>
      </div>
  );
}
