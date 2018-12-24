import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

import MUIDataTable from "mui-datatables";

import colors from './constants/colors';
import firebase from './components/firebase';

const styles = {
  div: {
    marginTop: '3%',
    marginBottom: '10%',
    marginLeft: '7%',
    marginRight: '7%',
  },
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
  addButton: {
    marginLeft: '30px',
    marginBottom: '25px',
  },
  modalPaper: {
    width: '400px',
    height: '250px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
    marginBottom: 'auto',
    padding: '10px',
  },
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.addVisitorButtonColor,
    },
    secondary: {
      main: colors.removeVisitorButtonColor,
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});



const getCurrentDateString = () => {
  var d = new Date();
  var dateString = "" + (d.getMonth()+1) + d.getDate() + d.getFullYear();
  return dateString;
};

class CurrentVisitors extends Component {
  constructor() {
    super();
    this.state = {
      showAddForm: false,
      name: "",
      description: "",
      data: [],
      rowsPerPage: 10,
    };
  }

  componentDidMount() {
    firebase.db.ref('data').child(getCurrentDateString()).on("value", (snapshot) => {
      var dataTemp = [];
      snapshot.forEach(function(d) {
        dataTemp.push([
          d.child('name').val(),
          d.child('timeIn').val(),
          d.child('timeOut').val(),
          d.child('description').val(),
          d.key,
        ]);
      });
      this.setState({data: dataTemp});
    });

    if (sessionStorage.hasOwnProperty('rowsPerPage')) {
      this.setState({rowsPerPage: sessionStorage.getItem('rowsPerPage')});
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleOpenAddForm = () => {
    this.setState({ showAddForm: true });
  };

  handleCloseAddForm = () => {
    this.setState({ showAddForm: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    var d = new Date();
    var time = d.getTime();
    var timeIn = d.toLocaleTimeString();
    firebase.db.ref('data').child(getCurrentDateString()).child(time).set({
      'name': this.state.name,
      'description': this.state.description,
      'timeIn': timeIn,
      'timeOut': "",
    });
    this.handleCloseAddForm();
    this.setState({ name: "", description: "" });
  };

  handleRemoveVisitor = (key) => {
    firebase.db.ref('data').child(getCurrentDateString()).child(key).remove();
  };

  handleSignOutVisitor = (key) => {
    var d = new Date();
    var timeOut = d.toLocaleTimeString();
    firebase.db.ref('data').child(getCurrentDateString()).child(key).child('timeOut').set(timeOut);
  };

  handleRowClick = (rowData) => {
    console.log(rowData);
  };

  handleRowsPerPageChange = (numberOfRows) => {
    this.setState({rowsPerPage: numberOfRows});
    sessionStorage.setItem('rowsPerPage', numberOfRows);
  };

  render() {
    const currentDateString = new Date().toDateString();

    const tableColumns = [
      {
        name: "Name",
      },
      {
        name: "Time In",
      },
      {
        name: "Time Out",
      },
      {
        name: "Description",
      },
      {
        name: "",
        options: {
          download: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const signedIn = tableMeta.rowData[2] === "";
            return (
              this.props.loggedIn ?
                <div style={{float: 'right'}}>
                  {
                    signedIn ?
                      <Tooltip title="Sign Out">
                        <IconButton color="default" onClick={() => {if(window.confirm('Are you sure?')) this.handleSignOutVisitor(value)}}>
                          <CheckBoxIcon/>
                        </IconButton>
                      </Tooltip>
                    : ""
                  }
                  <Tooltip title="Remove">
                    <IconButton color="secondary" onClick={() => {if(window.confirm('Are you sure?')) this.handleRemoveVisitor(value)}}>
                      <CancelIcon/>
                    </IconButton>
                  </Tooltip>
                </div>
              : ""
            )
          },
        }
      },
    ];

    const tableOptions = {
      filter: false,
      sort: false,
      selectableRows: false,
      downloadOptions: {filename: 'visitors.csv', separator: ','},
      rowsPerPageOptions: [10, 25, 50],
      onRowClick: (rowData) => this.handleRowClick(rowData),
      rowsPerPage: this.state.rowsPerPage,
      onChangeRowsPerPage: this.handleRowsPerPageChange,
    };

    return (
      <div style={styles.div}>
        <MuiThemeProvider theme={theme}>
          {
            this.props.loggedIn ?
              <Fab variant="extended" color="primary" style={styles.addButton} onClick={this.handleOpenAddForm}>
                <PersonAddIcon />
                <div style={{marginLeft: "7px"}}>
                  Add Visitor
                </div>
              </Fab>
            : null
          }
          <MUIDataTable
            title={currentDateString}
            data={this.state.data}
            columns={tableColumns}
            options={tableOptions}
          />
          <Modal
            open={this.state.showAddForm}
            onClose={this.handleCloseAddForm}
            disableAutoFocus
          >
            <Grow in={this.state.showAddForm}>
              <Paper style={styles.modalPaper} elevation={24}>
                <IconButton color="primary" aria-label="Close" onClick={this.handleCloseAddForm} style={styles.closeButton}>
                  <CloseIcon />
                </IconButton>
                <form style={styles.form} onSubmit={this.handleSubmit}>
                  <TextField
                    autoFocus
                    style={styles.textField}
                    type="name"
                    required
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                  />
                  <TextField
                    style={styles.textField}
                    rows="4"
                    required
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                  />
                  <div style={styles.button}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </Paper>
            </Grow>
          </Modal>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default CurrentVisitors;
