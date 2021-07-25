import React from 'react';

const ScrollToTop = ChildComponent => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};

export default ScrollToTop;
