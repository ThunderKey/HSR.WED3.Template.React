import React from "react";
import { Header, Menu, Dropdown } from 'semantic-ui-react';
import * as api from "../api";
import TransactionTable from "./TransactionTable";
import moment from '../moment_and_overrides';

export type Props = {};
window.mymo=moment;

let currentYear = new Date().getFullYear();
let years = [];
for(let i = 0; i < 5; i++) {
  let year = currentYear - i;
  years.push({text: year, value: year});
}
const months = moment.months().map((month, i) => {
  return {text: month, value: i};
});

//const monthNames = ['Januar', 'Februar', 'März'

class AllTransactions extends React.Component<Props, *> {
  state = {
    transactions: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  };

  handleYearChanged = (event: Event, {value}) => {
    this.setState({ year: value });
  };

  handleMonthChanged = (event: Event, {value}) => {
    this.setState({ month: value });
  };

  render() {
    return (
      <div>
        <Header as="h1">AllTransactions</Header>
        <Menu>
          <Menu.Item>Jahr auswählen</Menu.Item>
          <Dropdown label="Jahr auswählen" selection value={this.state.year} onChange={this.handleYearChanged}
            options={years} />
          <Menu.Item>Monat auswählen</Menu.Item>
          <Dropdown selection value={this.state.month} onChange={this.handleMonthChanged}
            options={months} />
        </Menu>
        <TransactionTable transactions={this.state.transactions} />
      </div>
    );
  };

  updateTransactions = () => {
    let start = new Date(this.state.year, this.state.month, 1);
    let end = moment(start).endOf('month');
    api
      .getTransactions(localStorage.token, start.toISOString(), end.toISOString(),-1)
      .then(({result, query}) => { this.setState({transactions: result}); })
      .catch((e) => console.error(e));
  };

  componentDidMount() {
    this.updateTransactions();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.transactions === prevState.transactions) {
      this.updateTransactions();
    }
  }
}

export default AllTransactions;
