import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import firebase from './components/firebase';

const styles = {
  closeButton: {
    float: "right",
  },
  form: {
    marginLeft: '15%',
  },
  textField: {
    width: '70%',
  },
  button: {
    marginTop: '10%',
  },
  authFailText: {
    color: "red",
  },
}

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loginFail: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    firebase.auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.props.close();
    }).catch((error) => {
      console.log(error);
      this.setState({loginFail: true});
    });
  };

  render() {
    return (
      <div>
        <IconButton color="primary" aria-label="Close" onClick={this.props.close} style={styles.closeButton}>
          <CloseIcon />
        </IconButton>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <TextField
            autoFocus
            style={styles.textField}
            type="email"
            required
            label="Email"
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <TextField
            style={styles.textField}
            type="password"
            required
            label="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          {
            this.state.loginFail ?
              <Typography variant="caption" style={styles.authFailText}>
                Authentication failed. <br/>
                Please contact <a href="mailto:sehoy@princeton.edu" target="_blank">sehoy@princeton.edu</a> to have your account added.
              </Typography>
            : null
          }
          <div style={styles.button}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>

      </div>
    );
  }
}

export default LoginForm;
