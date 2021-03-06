// @flow

import React from "react";
import { Header, Grid } from 'semantic-ui-react';
import * as api from "../api";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import UserCache from '../UserCache';

import type { Transaction } from "./TransactionTable";

export type Props = {};

type State = {
  transactions: Array<Transaction>,
};

class Dashboard extends React.Component<Props, *> {
  state : State = {
    transactions: [],
  };

  updateTransactions = () =>{
    api
      .getTransactions(UserCache.getToken())
      .then(({result, query}) => { this.setState({transactions: result}); })
      .catch((e) => console.error(e));
  }


  render() {
    return (
      <div>
        <Header as="h1">Dashboard</Header>
        <Grid columns='equal' divided>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={5} computer={3}>
              <TransactionForm onSubmit={this.updateTransactions} />
            </Grid.Column>
            <Grid.Column>
              <TransactionTable transactions={this.state.transactions} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };

  componentDidMount() {
    this.updateTransactions();
  }
}

export default Dashboard;
