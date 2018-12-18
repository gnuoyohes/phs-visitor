import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    marginTop: '20%',
  },
}

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        <IconButton color="primary" aria-label="Close" onClick={this.props.close} style={styles.closeButton}>
          <CloseIcon />
        </IconButton>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <TextField
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
          <div style={styles.button}>
            <Button variant="contained" color="primary" onClick={this.handleSubmit} type="submit">
              Submit
            </Button>
          </div>
        </form>

      </div>
    );
  }
}

export default LoginForm;
