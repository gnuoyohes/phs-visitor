import React, { Component } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends Component {

  render() {
    return (
      <div>
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.callback} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default ConfirmDialog;
