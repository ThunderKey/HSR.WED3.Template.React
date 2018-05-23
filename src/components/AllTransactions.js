// @flow

import React from "react";
import { Header, Menu, Dropdown } from 'semantic-ui-react';
import * as api from "../api";
import TransactionTable from "./TransactionTable";
import OptionalMessage from "./OptionalMessage";
import UserCache from '../UserCache';
import moment from '../moment_and_overrides';

import type { Transaction } from './TransactionTable';

export type Props = {};

let currentYear = new Date().getFullYear();
let years = [];
for(let i = 0; i < 3; i++) {
  let year = currentYear - i;
  years.push({text: year, value: year});
}
const months = moment.months().map((month, i) => {
  return {text: month, value: i};
});

type State = {
  transactions: Array<Transaction>,
  year: number,
  month: number,
  error: ?string,
};

class AllTransactions extends React.Component<Props, *> {
  state : State = {
    transactions: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    error: null,
  };

  handleYearChanged = (event: Event, {value}: {value: string}) => {
    this.setState({ year: parseInt(value, 10) });
  };

  handleMonthChanged = (event: Event, {value}: {value: string}) => {
    this.setState({ month: parseInt(value, 10) });
  };

  render() {
    return (
      <div>
        <Header as="h1">Alle Zahlungen</Header>
        <OptionalMessage negative message={this.state.error} />
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
      .getTransactions(UserCache.getToken(), start.toISOString(), end.toISOString(),-1)
      .then(({result, query}) => { this.setState({transactions: result, error: null}); })
      .catch((e) => e.response.json().then(j => this.setState({error: j.message})));
  };

  componentDidMount() {
    this.updateTransactions();
  }

  componentDidUpdate(prevProps : Props, prevState : State) {
    if(this.state.transactions === prevState.transactions && this.state.error === prevState.error) {
      this.updateTransactions();
    }
  }
}

export default AllTransactions;
