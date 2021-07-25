import styled from 'styled-components';

export const StyledButton = styled.button`
  margin-top: ${props => (props.Logout ? '' : '0.5rem')};
  background: ${props => (props.Logout ? '#fff' : '#01d1d1')};
  font: inherit;
  border: 1px solid #01d1d1;
  border-radius: 3px;
  padding: 0.25rem 1rem;
  margin-right: 1rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.26);
  color: ${props => (props.Logout ? '#01d1d1' : '#fff')};
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover,
  &:active {
    color: ${props => (props.Logout ? '#fff' : '')};
    background: #01a7a7;
    border-color: #01a7a7;
  }

  &:disabled {
    background: #eeeeee;
    border: 1px solid #eeeeee;
    color: #ababab;
    cursor: wait;
    transition: background-color 0s;
  }

  @media(max-width: 768px) {
    cursor: default;
  }

  @media(max-width: 426px) {
    width: 100%;
  }
`;
