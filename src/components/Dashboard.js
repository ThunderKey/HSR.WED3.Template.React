import React from "react";
import { Header, Table } from 'semantic-ui-react';
import * as api from "../api";
import TransactionForm from "./TransactionForm";

export type Props = {};

class Dashboard extends React.Component<Props, *> {
  state = {
    transactions: [],
  };

  render() {
    return (
      <div>
        <Header as="h1">Dashboard</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Von</Table.HeaderCell>
              <Table.HeaderCell>An</Table.HeaderCell>
              <Table.HeaderCell>Betrag</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.transactions.map((o, i) =>
              <Table.Row>
                <Table.Cell>{o.from}</Table.Cell>
                <Table.Cell>{o.target}</Table.Cell>
                <Table.Cell>{o.amount}</Table.Cell>
                <Table.Cell>{o.total}</Table.Cell>
                <Table.Cell>{o.date}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
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
