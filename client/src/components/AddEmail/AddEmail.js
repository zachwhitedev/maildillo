import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import './AddEmail.css';

export default function AddEmail(props) {
  const [state, setState] = useState({
    userid: props.userid,
    useremail: props.useremail,
    toemail: 'You must add a recipient email.',
    subject: '[no subject]',
    content: 'No content was added to this email.',
    month: '01',
    day: '01',
    year: '2020',
    hour: '12',
    minutes: '00',
    ampm: 'PM',
    size: 'small'
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (props.emails.length >= 3) {
      alert(
        "You have exceeded the limit of 3 emails per free account. Please upgrade to premium account to schedule more emails, even though this site doesn't actually have a premium option."
      );
      return;
    }

    // let executionTime1 = new Date('12/04/2012 07:00') // note that the month is first, so this one is Dec 4th (Jay-Z's birthday, and also a solid song).
    let executionTime = new Date(
      `${state.month}` +
        '/' +
        `${state.day}` +
        '/' +
        `${state.year}` +
        ' ' +
        `${state.hour}` +
        ':' +
        `${state.minutes}`
    );
    let executionTimeUnix = executionTime.getTime();

    if (state.ampm == 'PM') {
      executionTimeUnix += 43200000; // if PM, add 12 hours to Unix Epoch Time (43200 seconds // 43200000 ms)
    }

    const newEmail = {
      userid: props.userid,
      useremail: props.useremail,
      toemail: state.toemail,
      subject: state.subject,
      content: state.content,
      unixTime: executionTimeUnix,
      month: state.month, // month, day, hour, etc. only necessary for EmailItem view
      day: state.day,
      year: state.year,
      hour: state.hour,
      minutes: state.minutes,
      ampm: state.ampm,
      complete: false,
      edit: false
    };

    props.addEmail(newEmail);
    props.getUserEmails();
  };

  useEffect(() => {
    props.getUserEmails()
  }, [])

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
        <select name='month' onChange={e => handleChange(e)}>
          <option selected disabled hidden>
            Month
          </option>
          <option value='01'>January</option>
          <option value='02'>February</option>
          <option value='03'>March</option>
          <option value='04'>April</option>
          <option value='05'>May</option>
          <option value='06'>June</option>
          <option value='07'>July</option>
          <option value='08'>August</option>
          <option value='09'>September</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>December</option>
        </select>
        <select name='day' onChange={e => handleChange(e)} value={state.day}>
          <option selected disabled hidden>
            Day
          </option>
          <option value='01'>1</option>
          <option value='02'>2</option>
          <option value='03'>3</option>
          <option value='04'>4</option>
          <option value='05'>5</option>
          <option value='06'>6</option>
          <option value='07'>7</option>
          <option value='08'>8</option>
          <option value='09'>9</option>
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
        <select name='year' onChange={e => handleChange(e)}>
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
        <select name='hour' onChange={e => handleChange(e)} value={state.hour}>
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
          <option value='05'>05</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
          <option value='25'>25</option>
          <option value='30'>30</option>
          <option value='35'>35</option>
          <option value='40'>40</option>
          <option value='45'>45</option>
          <option value='50'>50</option>
          <option value='55'>55</option>
        </select>
        <select
          name='ampm'
          id='ampm'
          value={state.ampm}
          onChange={e => handleChange(e)}
        >
          <option value='AM'>am</option>
          <option value='PM'>pm</option>
        </select>
        {/* <span id='pst'>PST</span> DONT NEED THIS BC I THINK THE TIME ZONE DEFAULT'S TO CLIENT'S COMPUTER*/}
      </div>
      <Button onClick={() => onSubmit()} id='addemail-btn' size={state.size}>
        Add
      </Button>
    </div>
  );
}
