import styled from 'styled-components';

export const StyledForm = styled.form`
  width: ${props => (props.addEvent ? '100%' : '25rem')};
  max-width: ${props => (props.addEvent ? '' : '80%')};
  margin: auto;

  @media(max-width: 426px) {
    max-width: 100%;
  }

  div {
    margin-bottom: 1rem;

    label, input, textarea {
      width: 100%;
      display: block;
      box-sizing: border-box;
    }

    textarea {
      resize: none;
    }

    label {
      margin-bottom: 0.5rem;

      span {
        font-size: 0.7rem;
        color: #7c7c7c;
      }
    }

    input, textarea {
      padding: 0.4rem 0.5rem;
      border: 1px solid #000;

      &.error {
        border: 1px solid #ff0000;
      }
    }
  }

  p {
    margin: 0;
  }
`;
