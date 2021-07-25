import styled from 'styled-components';

export const StyledList = styled.ul`
  height: ${props => (props.Chart ? '45vh' : '')};
  width: 40rem;
  max-width: 90%;
  margin: 3rem auto;
  list-style: none;
  padding: 0;

  @media(max-width: 426px) {
    max-width: 100%;
  }
`;

export const StyledListItem = styled.li`
  position: ${props => (props.Event ? 'relative' : '')};
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #01d1d1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  div {
    &:nth-child(3) {
      @media(max-width: 768px) {
        margin: auto;
      }

      @media(max-width: 426px) {
        text-align: center;
        width: 100%;
      }

      button {
        margin: 0;
      }
    }
  }

  h1 {
    margin: 0;
    font-size: 1.2rem;
    color: #01d1d1;

    @media(max-width: 426px) {
      font-size: 1rem;
    }
  }

  h2 {
    margin: 0;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${props => (props.Bookings ? '#000' : '#7c7c7c')};

    @media(max-width: 426px) {
      font-size: 0.9rem;
    }

    div {
      @media(max-width: 426px) {
        display: flex;
        flex-direction: column;
      }
    }

    span {
      font-size: 0.8rem;
      font-style: italic;
      color: #7c7c7c;
      margin-right: 0.5rem;
      margin-bottom: 0.1rem;
    }
  }

  hr {
    margin: 0.8rem 0;
    width: 100%;
    height: 0.05rem;
    border: none;
    background-color: #cccfcd;

    @media(min-width: 769px) {
      display: none;
    }
  }

  p {
    margin: 0;
    font-size: 0.8rem;
  }
`;
