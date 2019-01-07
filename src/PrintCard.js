import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

const styles = {
  div: {
    padding: '80px',
    width: "400px",
    height: "200px",
  },
  text: {
    paddingBottom: '10px',
  },
}

class PrintCard extends Component {
  render() {
    return (
      <div style={styles.div}>
        <Typography variant="h5" color="inherit" style={styles.text}>
          Name:
        </Typography>
        <Typography variant="h4" color="inherit">
          {this.props.name}
        </Typography>
        <br/>
        <Typography variant="h5" color="inherit" style={styles.text}>
          Description:
        </Typography>
        <Typography variant="body1" color="inherit">
          {this.props.description} <br/><br/>
        </Typography>
      </div>
    );
  }
}

export default PrintCard;
