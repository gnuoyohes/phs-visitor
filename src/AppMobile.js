import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

import no from './images/no.gif';

const styles = {
  div: {
    width: '400px',
    marginTop: '3%',
    marginBottom: '10%',
    marginLeft: '7%',
    marginRight: '7%',
  },
  text: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  gif: {
    display: 'block',
    margin: 'auto',
  },
}

class AppMobile extends Component {
  render() {
    return (
      <div style={styles.div}>
        <Typography variant='h3' style={styles.text}>
          Sorry, not supported on mobile
        </Typography>
      </div>
    );
  }
}

export default AppMobile;
