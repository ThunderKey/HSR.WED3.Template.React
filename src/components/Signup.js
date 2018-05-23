// @flow

import React from "react";
import { Redirect } from "react-router-dom";
import { Header, Input, Button, Form, Segment } from 'semantic-ui-react';
import OptionalMessage from './OptionalMessage';
import { signup } from "../api";

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (
    login: string,
    password: string,
    callback: (error: ?Error) => void
  ) => void,
  /* We need to know what page the user tried to access so we can
     redirect after logging in */
  location: {
    state?: {
      from: string
    }
  }
};

class Signup extends React.Component<Props, *> {
  state = {
    login: '',
    firstname: '',
    lastname: '',
    password: '',
    passwordConfirmation:'',
    error: null,
    redirectToReferrer: false
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handleFirstnameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value });
    }
  };

  handleLastnameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handlePasswordConfirmationChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ passwordConfirmation: event.target.value });
    }
  };

  getErrorForCredentials = (property : string, translated : string) => {
    const value = this.state[property];
    if(value.length <= 3) {
      return `Bitte wählen Sie ein gültiges ${translated} welches mindestens 4 Zeichen lang ist!`;
    }
    return null;
  };

  getErrorForInfo = (property : string, translated : string) => {
    const value = this.state[property];
    if(value.length <= 3) {
      return `Bitte wählen Sie ein gültiger ${translated} welches mindestens 4 Zeichen lang ist!`;
    }
    return null;
  };

  getErrorForLogin = () => {
    return this.getErrorForCredentials('login', 'Login');
  };

  getErrorForFirstname = () => {
    return this.getErrorForInfo('firstname', 'Vorname');
  };

  getErrorForLastname = () => {
    return this.getErrorForInfo('lastname', 'Nachname');
  };

  getErrorForPassword = () => {
    return this.getErrorForCredentials('password', 'Passwort');
  };

  getErrorForPasswordConfirmation = () => {
    const passwordConfirmation = this.state.passwordConfirmation;
    if(passwordConfirmation !== this.state.password){
      return "Passwörter stimmen nicht überein!"
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, firstname, lastname, password } = this.state;
    signup(login, firstname, lastname, password)
      .then(result => {
        this.props.authenticate(login, password, error => {
          if(error) {
            this.setState({ error });
          } else {
            this.setState({ redirectToReferrer: true, error: null });
          }
        });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    };
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Header as="h1">Bank of Rapperswil</Header>
        <Form onSubmit={this.handleSubmit}>
          <Segment stacked id="compact-form">
            <Header as="h2">Wilkommen auf dem Finanzportal</Header>
            <Form.Field>
              <Input onChange={this.handleLoginChanged}
                icon='user'  iconPosition='left'
                placeholder="Login"
                value={this.state.login} />
              <OptionalMessage message={this.getErrorForLogin()} />
            </Form.Field>
            <Form.Field>
              <Input onChange={this.handleFirstnameChanged}
                icon='user'  iconPosition='left'
                placeholder="Vorname"
                value={this.state.firstname} />
              <OptionalMessage message={this.getErrorForFirstname()} />
            </Form.Field>
            <Form.Field>
              <Input onChange={this.handleLastnameChanged}
                icon='user'  iconPosition='left'
                placeholder="Nachname"
                value={this.state.lastname} />
              <OptionalMessage message={this.getErrorForLastname()} />
            </Form.Field>
            <Form.Field>
              <Input onChange={this.handlePasswordChanged}
                icon='lock'  iconPosition='left'
                placeholder="Passwort"
                type="password"
                value={this.state.password} />
              <OptionalMessage message={this.getErrorForPassword()} />
            </Form.Field>
            <Form.Field>
              <Input onChange={this.handlePasswordConfirmationChanged}
              icon='lock'  iconPosition='left'
              placeholder="Passwort"  type="password"
              value={this.state.passwordConfirmation} />
              <OptionalMessage message={this.getErrorForPasswordConfirmation()} />
            </Form.Field>
            <OptionalMessage negative message={error && 'Es ist ein Fehler aufgetreten!'} />
            <Button fluid size='large' content='Account eröffnen' color='teal' />
          </Segment>
        </Form>
     </div>
    );
  }
}

export default Signup;
