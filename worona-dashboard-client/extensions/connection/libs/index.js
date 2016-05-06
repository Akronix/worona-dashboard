import { createClass } from 'asteroid';
import { eventChannel } from 'redux-saga';
import { url } from '../config';

const Asteroid = createClass();

export class Connection {
  constructor(options = {}) {
    this._url = options.url || url;
    this._client = null;
  }

  start() {
    this._client = new Asteroid({
      autoConnect: false,
      autoReconnect: false,
      maintainCollections: true,
      ddpVersion: '1',
      endpoint: this._url,
    });
  }

  connect() {
    this._client.ddp.connect();
  }

  connectedEventChannel() {
    return eventChannel(listener => {
      const connected = this._client.ddp.on('connected', () => {
        listener('connected');
      });
      return () => {
        this._client.ddp.removeListener('connected', connected);
      };
    });
  }

  disconnectedEventChannel() {
    return eventChannel(listener => {
      const disconnected = this._client.ddp.on('disconnected', () => {
        listener('disconnected');
      });
      return () => {
        this._client.ddp.removeListener('disconnected', disconnected);
      };
    });
  }

  call(...params) {
    return new Promise((resolve, reject) => {
      this._client.call(...params)
      .then(result => {
        if (typeof result === 'object' && result.errorType === 'Meteor.Error') {
          reject(result);
        } else {
          resolve(result);
        }
      })
      .catch(error => reject(error));
    });
  }

  loginWithPassword(email, password) {
    return this._client.loginWithPassword({ email, password });
  }

  loggedInEventChannel() {
    return eventChannel(listener => {
      const loggedIn = this._client.on('loggedIn', () => {
        listener(this._client.userId);
      });
      return () => {
        this._client.removeListener('loggedIn', loggedIn);
      };
    });
  }

  loggedOutEventChannel() {
    return eventChannel(listener => {
      const loggedOut = this._client.on('loggedOut', () => {
        listener('logout');
      });
      return () => {
        this._client.removeListener('loggedOut', loggedOut);
      };
    });
  }

  logout() {
    return this._client.logout();
  }

  subscribe(...params) {
    return this._client.subscribe(...params);
  }
}

const connection = new Connection();
export const start = connection.start.bind(connection);
export const connect = connection.connect.bind(connection);
export const connectedEventChannel = connection.connectedEventChannel.bind(connection);
export const disconnectedEventChannel = connection.disconnectedEventChannel.bind(connection);
export const call = connection.call.bind(connection);
export const loginWithPassword = connection.loginWithPassword.bind(connection);
export const loggedInEventChannel = connection.loggedInEventChannel.bind(connection);
export const loggedOutEventChannel = connection.loggedOutEventChannel.bind(connection);
export const logout = connection.logout.bind(connection);
export const subscribe = connection.subscribe.bind(connection);
export default connection;

if (typeof window !== 'undefined') window.connection = connection;
