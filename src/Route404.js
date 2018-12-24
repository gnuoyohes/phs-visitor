import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

import gif404 from './images/404.gif';

const styles = {
  div: {
    marginTop: '3%',
    marginBottom: '10%',
    marginLeft: '7%',
    marginRight: '7%',
  },
  text: {
    color: 'orange',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gif: {
    display: 'block',
    margin: 'auto',
  },
}

class Route404 extends Component {
  render() {
    return (
      <div style={styles.div}>
        <Typography variant='h2' style={styles.text}>
          404 NOT FOUND
        </Typography>
        <img src={gif404} alt="404 gif" style={styles.gif} />
      </div>
    );
  }
}

export default Route404;
