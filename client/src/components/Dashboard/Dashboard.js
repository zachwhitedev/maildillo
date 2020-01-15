import React, { useState } from 'react';

// import axios from 'axios';

export default function Dashboard(props) {
  const [state, setState] = useState({
    userData: {
      email: ''
    }
  });

  return (
    <div id='pledge-to-band'>
      Your personal dashboard! I hope you're a logged in user with the email:
      {state.userData.email}
    </div>
  );
}
