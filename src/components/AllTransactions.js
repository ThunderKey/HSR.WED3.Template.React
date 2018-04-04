import React from "react";
import { Header, Menu, Dropdown, Message } from 'semantic-ui-react';
import * as api from "../api";
import TransactionTable from "./TransactionTable";
import moment from '../moment_and_overrides';

export type Props = {};
window.mymo=moment;

let currentYear = new Date().getFullYear();
let years = [];
for(let i = 0; i < 3; i++) {
  let year = currentYear - i;
  years.push({text: year, value: year});
}
const months = moment.months().map((month, i) => {
  return {text: month, value: i};
});

class AllTransactions extends React.Component<Props, *> {
  state = {
    transactions: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    error: null,
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
        <Header as="h1">Alle Zahlungen</Header>
        {this.state.error ? <Message negative>{this.state.error}</Message> : null}
        <Menu stackable>
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
      .then(({result, query}) => { this.setState({transactions: result, error: null}); })
      .catch((e) => e.response.json().then(j => this.setState({error: j.message})));
  };

  componentDidMount() {
    this.updateTransactions();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.transactions === prevState.transactions && this.state.error === prevState.error) {
      this.updateTransactions();
    }
  }
}

export default AllTransactions;
