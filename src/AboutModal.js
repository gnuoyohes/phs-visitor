import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

class AboutModal extends Component {
  render() {
    return (
      <div style={{width: 100, height: 100}}>
        <Typography variant="h5" color="inherit">
          About
        </Typography>
      </div>
    );
  }
}

export default AboutModal;
