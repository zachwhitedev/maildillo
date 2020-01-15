import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AgreementPage.css';
import { Checkbox, Button } from 'antd';
export default function AgreementPage(props) {
  const [state, setState] = useState({
    letsgo: true
  });

  const Letsgo = () => {
    return "Let's get rockin!";
  };

  return (
    <div id='pledge-to-band'>
      <div id='pledge-words-container'>
        I pledge allegiance,<br></br>
        to the band,<br></br>
        of Mr. Shneebly,<br></br>
        and will not fight him,<br></br>
        for creative control,<br></br>
        and will defer to him on all issues related to the musical direction of
        the band.<br></br>
        <br></br>
        <Checkbox
          onChange={() => setState({ ...state, letsgo: !state.letsgo })}
        />
        <br></br>
        <br></br>
        {!state.letsgo && <Letsgo />}
        <br></br>
        <br></br>
        <Button onClick={() => props.toggleAgreement(false)}>Back</Button>
      </div>
    </div>
  );
}
