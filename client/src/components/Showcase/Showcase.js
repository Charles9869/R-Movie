import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Showcase = () => {
  return (
    <Wrapper>
      <Opacity>
        <ShowcaseWrapper>
          <ShowcaseBackground>
            <ShowcaseInfo></ShowcaseInfo>
          </ShowcaseBackground>
        </ShowcaseWrapper>
      </Opacity>
      <h1>Star Wars: The Last Jedi</h1>
      <MoreButton to='/movie/181808'>More</MoreButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 50px;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    @media only screen and (max-width: 768px) {
      font-size: 30px;
    }
  }
`;

const ShowcaseWrapper = styled.div`
  height: 500px;
  width: 100%;
  position: relative;
`;

const ShowcaseBackground = styled.div`
  background-image: url('https://image.tmdb.org/t/p/w1280/5Iw7zQTHVRBOYpA0V6z0yypOPZh.jpg');
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  opacity: 0.5;
  position: relative;
  @media only screen and (max-width: 768px) {
    background-attachment: initial;
  }

  @media only screen and (max-width: 1100px) {
    background-attachment: initial;
    background-size: cover;
  }
`;

const ShowcaseInfo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  h1 {
    color: #fff;
    font-size: 50px;
  }
`;

const Opacity = styled.div`
  background-color: #000;
`;

const MoreButton = styled(Link)`
  margin-top: 20px;
  border: 2px solid #fff;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  text-decoration: none;
  padding: 5px 30px;
  border-radius: 10px;
  transition: all 200ms ease-in-out;

  &:hover {
    border: 2px solid #e50914;
    color: #e50914;
  }
`;

export default Showcase;
