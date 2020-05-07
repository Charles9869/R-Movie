import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import Star from '../Star';
import StarRating from '../Star/StarRating';

const Details = ({ movie }) => {
  return (
    <Wrapper>
      <Container>
        <h1>Details</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <strong>Release date: </strong>
          <DetailItems>
            {format(Date.parse(movie.release_date), 'LLLL do yyyy')}
          </DetailItems>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <strong style={{ marginRight: '5px' }}>Languages: </strong>
          {movie.spoken_languages.map((language) => {
            return (
              <DetailItems key={language.iso_639_1}>
                {language.name}
              </DetailItems>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <strong style={{ marginRight: '5px' }}>Production countries: </strong>
          {movie.production_countries.map((country) => {
            return (
              <DetailItems key={country.iso_3166_1}>{country.name}</DetailItems>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <strong style={{ marginRight: '5px' }}>IMDB: </strong>
          <Star average={movie.vote_average} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <strong style={{ marginRight: '5px' }}>Vote average: </strong>
          <StarRating id={movie.id} />
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 1px solid #000;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;

  p {
    line-height: 1;
  }
`;

const DetailItems = styled.p`
  margin-left: 5px;
`;

export default Details;
