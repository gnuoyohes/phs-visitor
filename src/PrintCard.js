import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

const styles = {
  div: {
    padding: '80px',
  },
  text: {
    paddingBottom: '10px',
  },
}

class PrintCard extends Component {
  render() {
    return (
      <div>
        <div style={styles.div}>
          <Typography variant="h4" color="inherit" style={styles.text}>
            Name:
          </Typography>
          <Typography variant="h3" color="inherit">
            {this.props.name}
          </Typography>
          <br/><br/>
          <Typography variant="h4" color="inherit" style={styles.text}>
            Description:
          </Typography>
          <Typography variant="h5" color="inherit">
            {this.props.description} <br/><br/>
          </Typography>
        </div>
      </div>
    );
  }
}

export default PrintCard;
