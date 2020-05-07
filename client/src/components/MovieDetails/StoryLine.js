import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { genres } from '../../data';

const getMovieGenres = (movie) => {
  let genreArray = [];

  if (movie !== undefined) {
    genres.forEach((genre) => {
      movie.genres.forEach((genre_movie) => {
        if (genre.id === parseInt(genre_movie.id)) {
          genreArray.push({ id: genre.id, name: genre.name });
        }
      });
    });
    return genreArray;
  }
};
const StoryLine = ({ movie }) => {
  return (
    <Wrapper>
      {movie && movie.status_code !== 34 && (
        <Container>
          <h1>Storyline</h1>
          <p>{movie.overview}</p>
          <Genres>
            <strong style={{ marginRight: '5px' }}>Genres: </strong>
            {getMovieGenres(movie).map((genre) => {
              return (
                <GenreItem
                  key={genre.id}
                  value={genre.id}
                  to={`/movies/${genre.id}`}
                >
                  {genre.name}
                </GenreItem>
              );
            })}
          </Genres>
        </Container>
      )}
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

const Genres = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const GenreItem = styled(Link)`
  color: #5db3e6;
  margin-right: 5px;
`;

export default StoryLine;
