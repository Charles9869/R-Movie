import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import noImageSrc from '../../assets/img/no-image.png';

const ActorsDetail = () => {
  const { id } = useParams();
  const [actor, setActor] = React.useState([]);
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetch(`/movie/actor/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setActor(data.actor);
      });

    fetch(`/actor/${id}/movies`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies.results);
      });
  }, []);

  return (
    <Wrapper>
      <Container>
        <ActorContainer>
          <img
            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
            alt='profile_img'
          />
          <InformationWrapper>
            <Information>
              <strong style={{ marginRight: '5px' }}>Name: </strong>
              <p>{actor.name}</p>
            </Information>
            <Information>
              <strong style={{ marginRight: '5px' }}>Birthday: </strong>
              <p>{actor.birthday}</p>
            </Information>
            <Information>
              <strong style={{ marginRight: '5px' }}>Location: </strong>
              <p>{actor.place_of_birth}</p>
            </Information>
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                borderTop: '1px solid #ddd',
                borderBottom: '1px solid #ddd',
                padding: '10px 0px',
              }}
            >
              <strong style={{ marginRight: '5px' }}>Biography </strong>
              <p style={{ textAlign: 'justify' }}>{actor.biography}</p>
            </div>
            <p
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                padding: '10px 0px',
              }}
            >
              Movies
            </p>
            <ActorMovies>
              {movies.map((movie) => {
                return (
                  <MovieItem key={movie.id} to={`/movie/${movie.id}`}>
                    <img
                      src={
                        movie.poster_path !== null
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : `${noImageSrc}`
                      }
                      alt='poster_img'
                    />
                  </MovieItem>
                );
              })}
            </ActorMovies>
          </InformationWrapper>
        </ActorContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ActorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  margin: 20px 0px;
  img {
    height: 300px;
  }
`;

const InformationWrapper = styled.div`
  width: 80%;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
`;

const ActorMovies = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  justify-items: center;
  margin-top: 20px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const MovieItem = styled(Link)`
  img {
    height: 230px;
    transition: all 350ms ease-in-out;

    @media only screen and (max-width: 768px) {
      height: 150px;
    }
    &:hover {
      opacity: 0.5;
    }
  }
`;

export default ActorsDetail;
