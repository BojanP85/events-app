const errorHandling = ({ graphQLErrors, networkError }) => { // 'graphQLErrors' and 'networkError' are destructured from 'error' object.
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
  return message;
};

export default errorHandling;
