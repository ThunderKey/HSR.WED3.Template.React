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

	updateTransactions = () =>{
	  api
        .getTransactions(localStorage.token)
        .then(({result, query}) => { this.setState({transactions: result}); })
        .catch((e) => console.error(e));
	}


  render() {
    return (
      <div>
        <Header as="h1">Dashboard</Header>
        <TransactionTable transactions={this.state.transactions} />
		<TransactionForm onSubmit={this.updateTransactions} />
      </div>
    );
  };

  componentDidMount() {
    this.updateTransactions();
  }
}

export default Dashboard;
