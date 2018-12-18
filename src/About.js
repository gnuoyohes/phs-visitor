import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  closeButton: {
    float: "right",
  },
  textBody: {
    padding: '40px',
  },
}

class About extends Component {
  render() {
    return (
      <div>
        <IconButton color="primary" aria-label="Close" onClick={this.props.close} style={styles.closeButton}>
          <CloseIcon />
        </IconButton>
        <div style={styles.textBody}>
          <Typography variant="h5" color="inherit">
            About
          </Typography>
          <br/><br/>
          <Typography variant="h7" color="inherit">
            Developed by Seho Young, Princeton University '19 <br/><br/>
            Contact <a href="mailto:sehoy@princeton.edu">sehoy@princeton.edu</a>
          </Typography>
        </div>
      </div>
    );
  }
}

export default About;
