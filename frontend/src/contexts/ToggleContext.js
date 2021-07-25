import React from 'react';

const Context = React.createContext();

export class ToggleStore extends React.Component {
  state = {
    toggledOn: false
  };

  componentDidUpdate() {
    document.querySelector("body").style.overflow = this.state.toggledOn ? 'hidden' : 'visible';
  }

  toggleClickHandler = () => {
    this.setState(prevState => {
      return { toggledOn: !prevState.toggledOn };
    });
  };

  render() {
    return (
      <Context.Provider value={{ ...this.state, toggleClickHandler: this.toggleClickHandler }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
