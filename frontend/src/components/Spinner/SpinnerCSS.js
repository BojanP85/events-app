import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  margin: ${props => (props.BookEvent ? '' : '4rem auto')};  
  text-align: center;
`;

const circles = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

export const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    border: 4px solid #01d1d1;
    opacity: 1;
    border-radius: 50%;
    animation: ${circles} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;
