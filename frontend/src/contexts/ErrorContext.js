// 'ErrorContext.js' file can serve as an alternative to 'errorHandling.js' helper file. see changes according to this alternative inside 'App.js' and 'EventItem.js' files. these changes were not implemented inside the 'Auth.js' file (because only 'EventItem.js' file is taken as an example), but if we are to use this alternative we would have to implement these changes inside the 'Auth.js' file as well.
import React from 'react';

const Context = React.createContext();

export class ErrorStore extends React.Component {
  state = {
    messages: []
  };

  handleErrors = ({ graphQLErrors, networkError }) => { // 'graphQLErrors' and 'networkError' are destructured from 'error' object.
    // const parsedError = JSON.parse(JSON.stringify(error));

    let message;

    if (graphQLErrors.length !== 0) {
      message = graphQLErrors;
    }
    if (networkError) {
      if (networkError.result) {
        message = networkError.result.errors;
      }
      if (typeof window !== 'undefined' && !window.navigator.onLine) {
        message = [{ message: { description: 'Internet connection is lost.' } }];

        // 'ApolloError' version (no need for 'CustomError' class)
        // message = [{ message: 'Internet connection is lost.' }];
      }
    }
    this.setState({ messages: message });
  };

  cleanMessages = (emailRef, passwordRef) => { // we need 'emailRef' and 'passwordRef' inside the 'Auth.js' file.
    this.setState({ messages: [] });
    if (emailRef && passwordRef) {
      emailRef.current.className = '';
      passwordRef.current.className = '';
    }
  };

  render() {
    return (
      <Context.Provider value={{ ...this.state, handleErrors: this.handleErrors, cleanMessages: this.cleanMessages }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
