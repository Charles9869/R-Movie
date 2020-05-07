import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Spinner, ThemeProvider } from 'evergreen-ui';

import { genres } from '../../data';

const MovieGenre = () => {
  const [currentMovies, setCurrentMovies] = React.useState([]);

  const { id } = useParams();
  const genre = genres.filter((genre) => genre.id === parseInt(id));

  React.useEffect(() => {
    fetch(`/movies/genre?id=${genre[0].id}`)
      .then((res) => res.json())
      .then((data) => setCurrentMovies(data.movies.results));
  }, []);
  return (
    <Container>
      <h1>Top 20 {genre[0].name} Movies</h1>

      <Movies>
        {currentMovies.length > 0 ? (
          <MovieGrid>
            {currentMovies.map((movie) => {
              return (
                <MovieItem key={movie.id} to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt='movie_img'
                  />
                </MovieItem>
              );
            })}
          </MovieGrid>
        ) : (
          <ThemeProvider value={SpinnerColor}>
            <LoadingSpinner size={32} />
          </ThemeProvider>
        )}
      </Movies>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  h1 {
    text-align: center;
  }
`;

const Movies = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
`;

const MovieGrid = styled.ul`
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

const SpinnerColor = {
  spinnerColor: '#E50914',
};

export default MovieGenre;
