import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

class LoginModal extends Component {
  render() {
    return (
      <div style={{width: 100, height: 100}}>
        <Typography variant="h5" color="inherit">
          Login
        </Typography>
      </div>
    );
  }
}

export default LoginModal;
