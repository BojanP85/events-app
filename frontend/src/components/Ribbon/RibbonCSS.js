import styled from 'styled-components';

export const StyledRibbon = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  position: absolute;
  top: -11px;
  left: -11px;

  &::before,
  &::after {
    z-index: -1;
    position: absolute;
    content: '';
    display: block;
    border: 5px solid ${props => (props.Booked ? '#b58b0b' : '#2980b9')};
    border-top-color: transparent;
    border-left-color: transparent;
  }

  &::before {
    top: 0;
    right: 0;
  }

  &::after {
    bottom: 0;
    left: 0;
  }

  span {
    position: absolute;
    display: block;
    width: 125px;
    padding: ${props => (props.Booked ? '0 0 0 20.5px' : '0 0 0 18px')};
    box-sizing: border-box;
    font-size: 14px;
    background: linear-gradient(to top left, ${props => (props.Booked ? '#ffc107 0%, #f57c00 100%' : '#4FC3F7 0%, #2196F3 100%')});
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    color: #fff;
    text-align: center;
    right: -25px;
    top: 19px;
    transform: rotate(-45deg);
    user-select: none;
  }
`;
