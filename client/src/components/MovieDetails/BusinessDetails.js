import React from 'react';
import styled from 'styled-components';
import { FaMoneyBillAlt, FaTicketAlt } from 'react-icons/fa';
import { WiTime10 } from 'react-icons/wi';
import { nFormatter } from '../../utils/helpers';

const BusinessDetails = ({ movie }) => {
  return (
    <Wrapper>
      <Container>
        <Data>
          <WiTime10 style={{ fontSize: '30px', marginRight: '5px' }} />
          <p>
            Running time: {Math.floor(movie.runtime / 60)}h{movie.runtime % 60}m
          </p>
        </Data>
        <Data>
          <FaMoneyBillAlt style={{ fontSize: '30px', marginRight: '5px' }} />
          <p>Budget: {nFormatter(movie.budget, 0)}$</p>
        </Data>
        <Data>
          <FaTicketAlt style={{ fontSize: '30px', marginRight: '5px' }} />
          <p>Revenue: {nFormatter(movie.revenue, 0)}$</p>
        </Data>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #363636;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Data = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  p {
    margin-top: 5px;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export default BusinessDetails;
