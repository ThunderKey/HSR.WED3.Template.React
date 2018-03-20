import React from "react";
import { Header, Form, Dropdown } from 'semantic-ui-react';
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
        <Form>
          <Form.Field>
            <label>Jahr auswählen</label>
            <Dropdown value={this.state.year} onChange={this.handleYearChanged}
              options={years} />
          </Form.Field>
          <Form.Field>
            <label>Monat auswählen</label>
            <Dropdown value={this.state.month} onChange={this.handleMonthChanged}
              options={months} />
          </Form.Field>
        </Form>
        <TransactionTable transactions={this.state.transactions} />
      </div>
    );
  };

  updateTransactions = () => {
    let start = new Date(this.state.year, this.state.month, 1);
    let end = moment(start).endOf('month');
    api
      .getTransactions(localStorage.token, start.toISOString(), end.toISOString())
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
