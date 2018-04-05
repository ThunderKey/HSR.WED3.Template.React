// @flow

import React from "react";
import { render } from "react-dom";
import App from "./App";
import 'semantic-ui-css/semantic.min.css';

const root : ?Element = document.getElementById("root");
if(root == null) {
  throw new Error('Unknown root element');
}
render(<App />, root);
