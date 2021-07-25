import styled from 'styled-components';

export const Header = styled.header`
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background: #01d1d1;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

export const Navigation = styled.nav`
  @media(max-width: 768px) {
    display: none;
  }

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0 1.5rem;

    &:first-child {
      margin-left: 0;
    }

    button {
      margin-left: 2rem;
      margin-right: -1.5rem;
    }
  }

  a {
    text-decoration: none;
    color: #000;

    &:hover,
    &:active,
    &.active {
      color: #fdefa0;
    }
  }
`;

export const MobileNavToggle = styled.button`
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  outline: none;
  position: relative;
  padding: 0;

  @media(min-width: 769px) {
    display: none;
  }

  span {
    transition: all 0.3s;
    border-radius: 2px;
    position: absolute;
    display: block;
    background: #fff;
    width: 100%;
    height: 2px;

    &:first-child {
      transform: rotate(${props => (props.showSideDrawer ? '45deg' : '0')});
      top: ${props => (props.showSideDrawer ? '19px' : '29px')};
    }

    &:nth-child(2n) {
      transform: rotate(${props => (props.showSideDrawer ? '-45deg' : '0')});
      bottom: ${props => (props.showSideDrawer ? '19px' : '19px')};
    }

    &:nth-child(3n) {
      transform: rotate(${props => (props.showSideDrawer ? '-45deg' : '0')});
      bottom: ${props => (props.showSideDrawer ? '19px' : '29px')};
    }
  }
`;
