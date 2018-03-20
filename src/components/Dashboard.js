import React from "react";
import { Header } from 'semantic-ui-react';
import * as api from "../api";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";

export type Props = {};

class Dashboard extends React.Component<Props, *> {
  state = {
    transactions: [],
  };

  render() {
    return (
      <div>
        <Header as="h1">Dashboard</Header>
        <TransactionTable transactions={this.state.transactions} />
        <TransactionForm />
      </div>
    );
  };

  componentDidMount() {
    api
      .getTransactions(localStorage.token)
      .then(({result, query}) => { console.log(result); this.setState({transactions: result}); })
      .catch((e) => console.error(e));
  }
}

export default Dashboard;
