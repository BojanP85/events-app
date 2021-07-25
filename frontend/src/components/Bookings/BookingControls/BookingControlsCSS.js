import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: auto;
  text-align: center;
  width: 15.625rem;

  @media(max-width: 768px) {
    width: 50%;
  }

  @media(max-width: 426px) {
    width: 100%;
  }

  div {
    box-sizing: border-box;
    display: inline-block;
    padding: 0.25rem 1rem;
    width: 50%;

    &.active ~ hr {
      margin-left: 50%;
    }

    &:first-child {
      &.active ~ hr {
        margin-left: 0;
      }
    }

    button {
      border: none;
      outline: none;
      font-size: inherit;
      padding: 0;
      background: transparent;
      cursor: pointer;
      user-select: none;

      &:hover,
      &.active {
        color: #01d1d1;
      }

      @media(max-width: 768px) {
        cursor: default;
      }
    }
  }

  hr {
    height: 1.5px;
    width: 50%;
    margin: 0;
    background: #01d1d1;
    border: none;
    transition: 0.3s ease-in-out;
  }
`;
