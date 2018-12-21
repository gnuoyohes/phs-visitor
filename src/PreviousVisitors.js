import React, { Component } from 'react';

import { DatePicker } from 'material-ui-pickers';

import TextField from '@material-ui/core/TextField';

import MUIDataTable from "mui-datatables";

import firebase from './components/firebase';

const styles = {
  div: {
    marginTop: '3%',
    marginBottom: '10%',
    marginLeft: '7%',
    marginRight: '7%',
  },
  datePicker: {
    marginLeft: '30px',
    marginBottom: '25px',
  },
}

const getDateString = (date) => {
  var dateString = "" + (date.getMonth()+1) + date.getDate() + date.getFullYear();
  return dateString;
};

class PreviousVisitors extends Component {
  constructor() {
    super();
    var date = new Date();
    date.setDate(date.getDate()-1);
    this.state = {
      selectedDate: date,
      data: [],
      rowsPerPage: 10,
    };
  }

  componentDidMount() {
    this.getData(getDateString(this.state.selectedDate));

    if (localStorage.hasOwnProperty('rowsPerPage')) {
      this.setState({rowsPerPage: localStorage.getItem('rowsPerPage')});
    }
    if (localStorage.hasOwnProperty('selectedDate')) {
      this.setState({selectedDate: new Date(localStorage.getItem('selectedDate'))});
    }
  }

  handleDateChange = date => {
    var d = new Date(date);
    this.setState({ selectedDate: d });
    localStorage.setItem('selectedDate', d.toString());
    this.getData(getDateString(d));
  };

  getData = (dateString) => {
    firebase.db.ref('data').child(dateString).on("value", (snapshot) => {
      var dataTemp = [];
      snapshot.forEach(function(d) {
        dataTemp.push([
          d.child('name').val(),
          d.child('timeIn').val(),
          d.child('timeOut').val(),
          d.child('description').val(),
        ]);
      });
      this.setState({data: dataTemp});
    });
  };

  handleRowClick = (rowData) => {
    console.log(rowData);
  };

  handleRowsPerPageChange = (numberOfRows) => {
    this.setState({rowsPerPage: numberOfRows});
    localStorage.setItem('rowsPerPage', numberOfRows);
  };

  render() {
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
        <DatePicker
          style={styles.datePicker}
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
          keyboard
          disableOpenOnEnter
          disableFuture
          showTodayButton
          format="MM/DD/YYYY"
        />
        <MUIDataTable
          title={this.state.selectedDate.toDateString()}
          data={this.state.data}
          columns={tableColumns}
          options={tableOptions}
        />
      </div>
    );
  }
}

export default PreviousVisitors;
