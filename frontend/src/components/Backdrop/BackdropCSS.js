import styled from 'styled-components';

export const Wrapper = styled.div`
  z-index: 2;
  position: ${props => (props.showBackdrop ? 'fixed' : '')};
  top: ${props => (props.Modal ? '0' : '3.5rem')};
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => (props.showBackdrop ? 'rgba(0, 0, 0, 0.8)' : '')};

  @media(min-width: 769px) {
    display: ${props => (props.Modal ? '' : 'none')};
  }
`;
