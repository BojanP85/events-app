import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  border: 1px solid #01d1d1;
  border-radius: 5px;
  padding: 1rem;
  margin: auto;
  width: 30rem;
  max-width: 80%;

  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;

    @media(max-width: 426px) {
      font-size: ${props => (props.Bookings ? '1rem' : '1.2rem')};
    }

    @media(max-width: 320px) {
      font-size: 1rem;
    }

    &:last-child {
      margin-bottom: 0;

      a {
        text-decoration: none;
        color: #01d1d1;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1.5px;
          display: block;
          margin-top: 3px;
          right: 0;
          background: #01d1d1;
          transition: width .2s ease;
          -webkit-transition: width .2s ease;
        }

        &:hover::after {
          width: 100%;
          left: 0;
          background: #01d1d1;
        }
      }
    }
  }
`;
