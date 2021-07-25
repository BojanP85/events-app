import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import AuthContext from '../../contexts/AuthContext';

import loginQuery from '../../queries/login';
import signupMutation from '../../mutations/signup';

import errorHandling from '../../helpers/errorHandling';

import { StyledForm } from './AuthCSS';

import Button from '../Button/Button';
import Messages from '../Messages/Messages';

const Auth = props => {
  const { login } = useContext(AuthContext);

  const messageRef = useRef();

  const [loginUser, { client, loading: loginLoading }] = useLazyQuery(loginQuery, {
    onError: error => {
      messageRef.current = errorHandling(error);
      setMessages(messageRef.current);
    },
    onCompleted: data => {
      const { token, userId, refreshToken } = data.login;
      if (token) {
        login(token, userId, refreshToken);
      }
      client.clearStore();
    }
  });
  const [createUser, { loading: signupLoading }] = useMutation(signupMutation, {
    onError: error => {
      messageRef.current = errorHandling(error);
      setMessages(messageRef.current);
    },
    onCompleted: data => {
      console.log(data);
      emailRef.current.value = '';
      passwordRef.current.value = '';
      messageRef.current = [{
        message: {
          description: 'You created account successfully.\nPlease log in to continue.',
          type: 'success' // this property needs to be adjusted when using 'ApolloError', since 'ApolloError' relies on 'extensions.type' property.
        }
      }];
      setMessages(messageRef.current);
    }
  });

  const [isLogin, setIsLogin] = useState(true);
  const [messages, setMessages] = useState([]);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (props.expirationMsg) {
      messageRef.current = [{
        message: {
          description: props.expirationMsg
        }
      }];

      setMessages(messageRef.current);
    }
  }, [props.expirationMsg]);

  const switchModeHandler = () => {
    setIsLogin(prevIsLogin => !prevIsLogin);
    cleanMessages();
  };

  const handleSubmit = async event => {
    event.preventDefault();

    cleanMessages();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    if (isLogin) {
      await loginUser({ variables: { email, password } });
    } else {
      await createUser({ variables: { email, password } });
    }
  };

  const cleanMessages = () => {
    setMessages([]);
    emailRef.current.className = '';
    passwordRef.current.className = '';
  };

  const disableButton = () => {
    return loginLoading || signupLoading ? true : false;
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <div>
        <Button type="submit" disabled={disableButton()}>Submit</Button>
        <Button type="button" disabled={disableButton()} buttonClickHandler={switchModeHandler}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </Button>
      </div>
      <Messages messages={messages} emailRef={emailRef} passwordRef={passwordRef} />
    </StyledForm>
  );
};

export default Auth;
