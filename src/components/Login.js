// @flow

import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Header, Input, Button, Form, Segment } from 'semantic-ui-react'

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

class Login extends React.Component<Props, *> {
  state = {
    login: "",
    password: "",
    error: undefined,
    redirectToReferrer: false
  };


  getErrorForPassword  = () => {
    const password = this.state.password;
    if(password.length === 0){
      return "Passwort is empty!";
    }
    if(password.length <= 3){
      return "Password too short!";
    }
  };

  getErrorForLogin = () =>{
    const login = this.state.login;
    if(login.length === 0){
      return "Username is empty!";
    }
    if(login.length <=3){
      return "Username too short!";
    }
  };

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value });
    }
  };

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, password } = this.state;
    this.props.authenticate(login, password, error => {
      if (error) {
        this.setState({ error });
      } else {
        this.setState({ redirectToReferrer: true, error: null });
      }
    });
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
			<Segment stacked>
				<Header as="h2">Login</Header>
			
				<Form.Field>
					<Input onChange={this.handleLoginChanged}
						icon='user' iconPosition='left'
						placeholder = 'Login'
						value={this.state.login} />
		
				</Form.Field>
				<p>{this.getErrorForLogin()}</p>
				
				<Form.Field>
					<Input onChange={this.handlePasswordChanged}
						icon='lock' iconPosition='left'
						placeholder='Password' type='password' 
						value={this.state.password} />
				</Form.Field>
				<p> {this.getErrorForPassword()} </p>
						
				<Button fluid size='Large' content='Log-in' color='teal' />

        		{error && <p>Es ist ein Fehler aufgetreten!</p>}
        		<Link to="/signup">Noch keinen Account?</Link>
			</Segment>
		</Form>
		</div>
    );
  }
}

export default Login;
