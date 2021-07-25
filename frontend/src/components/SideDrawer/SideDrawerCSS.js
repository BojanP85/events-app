import styled from 'styled-components';

export const Navigation = styled.nav`
  height: 100%;
  background: #01d1d1;
  box-shadow: ${props => (props.showSideDrawer ? '2px 1px 0px rgba(0, 0, 0, 0.5)' : '')};
  position: fixed;
  top: 3.5rem;
  left: 0;
  width: 70%;
  max-width: 400px;
  transform: ${props => (props.showSideDrawer ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-out;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 2.5rem 2.5rem;

    button {
      margin-top: 2rem;
    }
  }

  a {
    text-decoration: none;
    color: #000;

    &:hover,
    &:active,
    &.active {
      color: #f8e264;
    }
  }
`;
