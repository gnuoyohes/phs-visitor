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

import ReactModal from 'react-modal';

import CurrentVisitors from './CurrentVisitors';
import PreviousVisitors from './PreviousVisitors';
import LoginModal from './LoginModal';
import AboutModal from './AboutModal';

import colors from './constants/colors';
import routes from './constants/routes';

import './App.css';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    flexGrow: 1,
    paddingTop: 65,
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primaryColor,
    },
    secondary: {
      main: colors.secondaryColor,
      contrastText: colors.primaryColor,
    },
  },
  status: {
    danger: 'orange',
  },
});

class App extends Component {
  state = {
    menuAnchor: null,
    tabValue: 0,
    showLoginModal: false,
    showAboutModal: false,
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
    this.setState({ showLoginModal: true });
  };

  handleCloseLoginModal = () => {
    this.setState({ showLoginModal: false });
  };

  handleOpenAboutModal = () => {
    this.setState({ showAboutModal: true });
  };

  handleCloseAboutModal = () => {
    this.setState({ showAboutModal: false });
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
                <div style={{paddingRight: 10}}>
                  <Button variant="contained" color="secondary" onClick={this.handleOpenLoginModal}>Login</Button>
                </div>
                <Button color="inherit" onClick={this.handleOpenAboutModal}>About</Button>
              </Toolbar>
            </AppBar>
            <Paper style={styles.paper} square>
              <Tabs value={this.state.tabValue} onChange={this.handleTabChange} indicatorColor="primary" textColor="primary" centered>
                <Tab style={styles.grow} label="Current Visitors" component={Link} to={routes.currentVisitors}/>
                <Tab style={styles.grow} label="Previous Visitors" component={Link} to={routes.previousVisitors}/>
              </Tabs>
            </Paper>
            <Route exact path={routes.currentVisitors} component={CurrentVisitors} />
            <Route path={routes.previousVisitors} component={PreviousVisitors} />
            <ReactModal isOpen={this.state.showLoginModal}>
              <LoginModal/>
              <Button variant="contained" color="primary" onClick={this.handleCloseLoginModal}>Close</Button>
            </ReactModal>
            <ReactModal isOpen={this.state.showAboutModal}>
              <AboutModal/>
              <Button variant="contained" color="primary" onClick={this.handleCloseAboutModal}>Close</Button>
            </ReactModal>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
