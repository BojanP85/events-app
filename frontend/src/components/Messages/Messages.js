import React from 'react';

import { StyledMessage } from './MessagesCSS';

const Messages = props => {
  const renderMessages = () => {
    return props.messages.map(({ message: { type, description } }, i) => {
      if (type === 'email') {
        props.emailRef.current.className = 'error';
      }
      if (type === 'password') {
        props.passwordRef.current.className = 'error';
      }

      return (
        <StyledMessage key={i} className={type === 'success' ? 'successMsg' : 'errorMsg'}>
          {description.split('\n').map((msg, i) => <p key={i}>{msg}</p>)}
        </StyledMessage>
      );
    });
  };

  // 'ApolloError' version (no need for 'CustomError' class)
  /*
  const renderMessages = () => {
    return props.messages.map(({ message, extensions }, i) => {
      if (extensions) {
        if (extensions.type === 'email') {
          props.emailRef.current.className = 'error';
        }
        if (extensions.type === 'password') {
          props.passwordRef.current.className = 'error';
        }
      }

      return (
        <StyledMessage key={i} className={extensions.type === 'success' ? 'successMsg' : 'errorMsg'}>
          {message.split('\n').map((msg, i) => <p key={i}>{msg}</p>)}
        </StyledMessage>
      );
    });
  };
  */

  return renderMessages();
};

export default Messages;
