import styled from 'styled-components';

export const Wrapper = styled.div`
  visibility: ${props => (props.showModal ? 'visible' : 'hidden')};
  opacity: ${props => (props.showModal ? '1' : '0')};
  transform: ${props => (props.showModal ? 'scale(1.0)' : 'scale(1.5)')};
  transition: visibility 0.25s, opacity 0.3s, transform 0.25s;
  width: 90%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: fixed;
  top: 10vh;
  left: 5%;

  @media (min-width: 769px) {
    width: 30rem;
    left: calc((100% - 30rem) / 2);
  }

  header {
    padding: 1rem;
    background: #01d1d1;
    color: #fff;

    h1 {
      margin: 0;
      font-size: 1.25rem;
    }
  }

  section {
    padding: 1rem;

    &:last-child {
      display: flex;
      justify-content: flex-end;

      @media(max-width: 426px) {
        display: block;
      }

      button {
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;
