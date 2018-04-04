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
		<div class="ui stackable two column grid">
			<div class="column"> <TransactionForm onSubmit={this.updateTransactions} /> </div>
        	<div class="column"> <TransactionTable transactions={this.state.transactions} /> </div>
		</div>
      </div>
    );
  };

  componentDidMount() {
    this.updateTransactions();
  }
}

export default Dashboard;
