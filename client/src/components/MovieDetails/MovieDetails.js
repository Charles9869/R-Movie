import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import Trailer from './Trailer';
import MovieInformation from './MovieInformation';
import BusinessDetails from './BusinessDetails';
import CommentBar from './CommentBar';

const MovieDetails = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = React.useState([]);

  React.useEffect(() => {
    fetch(`/movie/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentMovie(data.movies));
  }, []);

  return (
    <React.Fragment>
      {currentMovie && currentMovie.status_code !== 34 ? (
        <React.Fragment>
          <TitleWrapper>
            <Container>
              <Title to={'/'}>
                <span style={{ color: '#e50914' }}>Home </span> |{' '}
                {currentMovie.title}
              </Title>
            </Container>
          </TitleWrapper>
          <Trailer title={currentMovie.title} />
          <BusinessDetails movie={currentMovie} />
          <MovieInformation movie={currentMovie} />
          <CommentBar id={currentMovie.id} />
        </React.Fragment>
      ) : (
        <h1 style={{ textAlign: 'center' }}>
          The ressources is not available!
        </h1>
      )}
    </React.Fragment>
  );
};

const TitleWrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: #363636;
  display: flex;
  align-items: center;
  color: #fff;
`;

const Title = styled(Link)`
  cursor: pointer;
  font-size: 1.17em;
  text-decoration: none;
  color: #fff;
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default MovieDetails;
