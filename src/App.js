import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

import CurrentVisitors from './CurrentVisitors';
import PreviousVisitors from './PreviousVisitors';
import LoginForm from './LoginForm';
import About from './About';

import colors from './constants/colors';
import routes from './constants/routes';
import firebase from './components/firebase';

import './App.css';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    marginLeft: '20px',
  },
  paper: {
    flexGrow: 1,
    paddingTop: 65,
  },
  tab: {
    flexGrow: 1,
  },
  modalPaper: {
    width: '30%',
    height: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
    marginBottom: 'auto',
    padding: '10px',
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primaryColor,
    },
    secondary: {
      main: colors.secondaryColor,
      contrastText: colors.secondaryContrastText,
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

class App extends Component {
  state = {
    menuAnchor: null,
    tabValue: 0,
    showLoginModal: false,
    showAboutModal: false,
    loggedIn: false,
    currentUser: "",
  };

  handleMenuClick = event => {
    this.setState({ menuAnchor: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuAnchor: null });
  };

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  handleOpenLoginModal = () => {
    if (!this.state.showAboutModal)
      this.setState({ showLoginModal: true });
  };

  handleCloseLoginModal = () => {
    this.setState({ showLoginModal: false });
  };

  handleOpenAboutModal = () => {
    if (!this.state.showLoginModal)
      this.setState({ showAboutModal: true });
  };

  handleCloseAboutModal = () => {
    this.setState({ showAboutModal: false });
  };

  handleLogin = (email, password) => {
    firebase.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.setState({ loggedIn: true, currentUser: email });
      this.handleCloseLoginModal();
    }).catch((error) => {
      console.log(error);
    });
    return this.loggedIn;
  };

  handleLogout = () => {
    firebase.auth.signOut().then(() => {
      this.setState({ loggedIn: false, currentUser: "" });
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="div">
            <AppBar position="fixed" color="primary" style={styles.grow}>
              <Toolbar>
                <IconButton color="inherit" aria-label="Menu" style={styles.menuButton} onClick={this.handleMenuClick}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.menuAnchor}
                  open={Boolean(this.state.menuAnchor)}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem onClick={this.handleMenuClose}>Menu Item 1</MenuItem>
                  <MenuItem onClick={this.handleMenuClose}>Menu Item 2</MenuItem>
                </Menu>
                <Typography variant="h4" color="inherit" style={styles.grow}>
                  PHS Visitor Sign-In
                </Typography>
                {
                  this.state.loggedIn ?
                    <Typography variant="subtitle1" color="inherit">
                      Hello, {this.state.currentUser}
                    </Typography>
                  : null
                }
                {
                  this.state.loggedIn ?
                    <Button variant="contained" color="secondary" onClick={this.handleLogout} style={styles.button}>Logout</Button>
                  :
                    <Button variant="contained" color="secondary" onClick={this.handleOpenLoginModal} style={styles.button}>Login</Button>
                }
                <Button color="inherit" onClick={this.handleOpenAboutModal} style={styles.button}>About</Button>
              </Toolbar>
            </AppBar>
            <Paper style={styles.paper} square>
              <Tabs value={this.state.tabValue} onChange={this.handleTabChange} indicatorColor="primary" textColor="primary" centered>
                <Tab style={styles.tab} label="Current Visitors" component={Link} to={routes.currentVisitors}/>
                <Tab style={styles.tab} label="Previous Visitors" component={Link} to={routes.previousVisitors}/>
              </Tabs>
            </Paper>
            <Route exact path={routes.currentVisitors} component={CurrentVisitors} />
            <Route path={routes.previousVisitors} component={PreviousVisitors} />
            <div className="modal-div">
              <Modal
                open={this.state.showLoginModal}
                onClose={this.handleCloseLoginModal}
                disableAutoFocus
              >
                <Slide direction="down" in={this.state.showLoginModal} mountOnEnter unmountOnExit>
                  <Paper style={styles.modalPaper} elevation={24}>
                    <LoginForm close={this.handleCloseLoginModal} login={this.handleLogin}/>
                  </Paper>
                </Slide>
              </Modal>
              <Modal
                open={this.state.showAboutModal}
                onClose={this.handleCloseAboutModal}
                disableAutoFocus
              >
                <Slide direction="down" in={this.state.showAboutModal} mountOnEnter unmountOnExit>
                  <Paper style={styles.modalPaper} elevation={24}>
                    <About close={this.handleCloseAboutModal}/>
                  </Paper>
                </Slide>
              </Modal>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
