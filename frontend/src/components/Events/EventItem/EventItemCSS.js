import styled from 'styled-components';

export const StyledEvent = styled.div`
  opacity: ${props => (props.Loading ? '0.3' : '1')};

  h3 {
    margin: 0;

    &:first-child {
      margin-top: 1rem;
    }

    &:nth-child(2) {
      margin-top: 0.6rem;
    }

    &:nth-child(3) {
      margin-top: 2rem;
    }

    span {
      font-style: italic;
      font-size: 1.1rem;
      color: #7c7c7c;
      margin-left: 1rem;

      @media(max-width: 376px) {
        margin-left: 0.6rem;
      }
    }
  }

  p {
    margin: 0;
    margin-top: 0.6rem;
    padding-right: 5px;
    white-space: pre-wrap;
    max-height: 15rem;
    overflow: auto;

    @media(max-width: 426px) {
      max-height: 10rem;
    }
  }
`;

export const SpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  height: 100px;
  width: 100px;
`;
