import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadButton from '../LoadButton';
import { Spinner } from 'evergreen-ui';
import { ThemeProvider } from 'evergreen-ui';
import FilterBar from '../Filter/FilterBar';

const MovieList = ({ movieSearchInput }) => {
  const movies = useSelector((state) => state.movies.movies);
  const status = useSelector((state) => state.movies.status);

  return (
    <MovieListWrapper>
      <Container>
        {movieSearchInput.length > 0 ? (
          <h1 style={{ textAlign: 'center', margin: '20px 0px' }}>
            Search result
          </h1>
        ) : (
          <h1 style={{ textAlign: 'center', margin: '20px 0px' }}>
            Popular movies
          </h1>
        )}

        {status === 'idle' && <FilterBar />}

        <MovieUL>
          {status === 'idle' ? (
            Object.values(movies).map((movie) => {
              if (movie.poster_path !== null) {
                return (
                  <MovieItem key={movie.id} to={`/movie/${movie.id}`}>
                    {movie.poster_path !== null && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt='movie-img'
                      />
                    )}
                  </MovieItem>
                );
              }
            })
          ) : (
            <div style={{ height: '100px' }}>
              <ThemeProvider value={SpinnerColor}>
                <LoadingSpinner size={32} />
              </ThemeProvider>
            </div>
          )}
        </MovieUL>
        {status === 'idle' && <LoadButton />}
      </Container>
    </MovieListWrapper>
  );
};

const MovieListWrapper = styled.div`
  padding-top: 20px;
`;

const MovieUL = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  justify-items: center;
  position: relative;
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const MovieItem = styled(Link)`
  img {
    height: 300px;
    transition: all 350ms ease-in-out;

    @media only screen and (max-width: 768px) {
      height: 150px;
    }
    &:hover {
      opacity: 0.5;
    }
  }
`;

const LoadingSpinner = styled(Spinner)`
  color: red;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  position: relative;
`;

const SpinnerColor = {
  spinnerColor: '#E50914',
};

export default MovieList;
