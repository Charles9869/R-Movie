import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { incrementPage, decrementPage } from '../../actions/actions';

const LoadButton = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      {window.localStorage.getItem('isFiltered') === null && (
        <React.Fragment>
          <Button onClick={() => dispatch(decrementPage())}>Back</Button>
          <Button onClick={() => dispatch(incrementPage())}>Next</Button>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  font-size: 20px;
  width: 100px;
  margin: 5px;
  border: none;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: #363636;
  }
`;

export default LoadButton;
