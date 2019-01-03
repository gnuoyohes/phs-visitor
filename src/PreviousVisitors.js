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

const padZeros = (num, size) => {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const getDateString = (date) => {
  var dateString = "" + date.getFullYear() + padZeros(date.getMonth()+1, 2) + padZeros(date.getDate(), 2);
  return dateString;
};

class PreviousVisitors extends Component {
  constructor() {
    super();
    var date = new Date();
    this.state = {
      selectedDate: date,
      data: [],
      rowsPerPage: 10,
    };
  }

  componentDidMount() {
    if (sessionStorage.hasOwnProperty('rowsPerPage2')) {
      this.setState({rowsPerPage: sessionStorage.getItem('rowsPerPage2')});
    }
    var d = new Date();
    if (sessionStorage.hasOwnProperty('selectedDate')) {
      d = new Date(sessionStorage.getItem('selectedDate'))
    }
    this.setState({selectedDate: d});
    this.getData(getDateString(d));
  }

  handleDateChange = date => {
    var d = new Date(date);
    this.setState({ selectedDate: d });
    sessionStorage.setItem('selectedDate', d.toString());
    this.getData(getDateString(d));
  };

  getData = (dateString) => {
    firebase.db.ref('data').child(dateString).once("value", (snapshot) => {
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
    sessionStorage.setItem('rowsPerPage2', numberOfRows);
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
