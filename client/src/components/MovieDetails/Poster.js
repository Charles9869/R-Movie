import React from 'react';
import styled from 'styled-components';
import noImageSrc from '../../assets/img/no-image.png';

const Poster = ({ movie }) => {
  return (
    <Wrapper>
      <Picture
        src={
          movie.poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : `${noImageSrc}`
        }
      ></Picture>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Picture = styled.img`
  max-width: 300px;
  height: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default Poster;
