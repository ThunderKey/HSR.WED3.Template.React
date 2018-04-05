// @flow

import type { User } from "./api";

export default {
  getUser() : User {
    return JSON.parse(localStorage.getItem('user'));
  },

  getToken() : string {
    return localStorage.getItem('token');
  },


  set(user : User, token : string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  },

  clear() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
