// @flow

import type { User } from './api';

export default {
  getUser() : User {
    return JSON.parse(this._get('user'));
  },

  getToken() : string {
    return this._get('token');
  },

  set(user : User, token : string) {
    this._set('user', JSON.stringify(user));
    this._set('token', token);
  },

  clear() {
    this._remove('token');
    this._remove('user');
  },

  _get(key : string) : string {
    const value : ?string = localStorage.getItem(key);
    if(value) {
      return value;
    }
    throw new Error(`No ${key} set`);
  },

  _set(key : string, value : string) {
    localStorage.setItem(key, value);
  },

  _remove(key : string) {
    localStorage.removeItem(key);
  },
};
