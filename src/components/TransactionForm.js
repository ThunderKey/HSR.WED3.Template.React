// @flow

import React from "react";
import { Form, Input, Button } from 'semantic-ui-react';
import * as api from "../api";
import OptionalMessage from './OptionalMessage';
import UserCache from '../UserCache';

export type Props = {
  onSubmit: ()=> void,
};

class TransactionForm extends React.Component<Props, *> {
  state = {
    from: '',
    to: '',
    amount: '',
    success: null,
    toMessage:''
  };

  handleToChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      if(event.target.value) {
        this.setState({ to: event.target.value });
        api
          .getAccount(event.target.value , UserCache.getToken())
          .then(({accountNr, owner}) => this.setState({ toMessage: `${owner.firstname} ${owner.lastname}`}))
          .catch((e)=>this.setState({toMessage: 'Benutzer nicht gefunden!'}));
      } else {
        this.setState({ to: event.target.value });
      }
    }
  };

  handleAmountChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ amount: event.target.value });
    }
  };

  getErrorForAmount  = () => {
    const value = this.state.amount;
    if(value <= 0.05) {
      return `Bitte wählen Sie einen gültigen Betrag welcher grösser als 0.05 ist!`;
    }
    return null;
  };

  createTransaction = () => {
    api
      .transfer(this.state.to, this.state.amount, UserCache.getToken())
      .then((result) =>{
        this.setState({success: true, to: '', amount: ''});
        this.props.onSubmit();
      }).catch((e) => this.setState({success: false}));
  };

  render() {
    return (
      <Form onSubmit={this.createTransaction}>
        <Form.Field>
          <label>Von</label>
          <Input disabled
            placeholder = 'Von'
            value={this.state.from} />
        </Form.Field>
        <Form.Field>
          <label>An</label>
          <Input onChange={this.handleToChanged}
            placeholder = 'An'
            value={this.state.to} />
          <OptionalMessage message={this.state.toMessage} />
        </Form.Field>
        <Form.Field>
          <label>Betrag</label>
          <Input onChange={this.handleAmountChanged}
            placeholder = 'Betrag'
            value={this.state.amount} />
          <OptionalMessage message={this.getErrorForAmount()} />
        </Form.Field>
        <OptionalMessage negative message={this.state.success === false && 'Es konnte nicht bezahlt werden! Bitte prüfen Sie Ihre Angaben.'} />
        <OptionalMessage positive message={this.state.success === true && 'Erfolgreich bezahlt.'} />
        <Button fluid size='large' content='Bezahlen' color='teal' />
      </Form>
    );
  };

  componentDidMount() {
    this.setState({from: UserCache.getUser().accountNr});
  }
}

export default TransactionForm;
