// @flow

import React from "react";
import { Message } from 'semantic-ui-react';

export type Props = {
  message: ?string|boolean,
  negative?: boolean,
  positive?: boolean,
};

class OptionalMessage extends React.Component<Props, *> {
  render() {
    if(this.props.message) {
      return (<Message negative={this.props.negative}>{this.props.message}</Message>);
    } else {
      return (<div/>);
    }
  };
}

export default OptionalMessage;
