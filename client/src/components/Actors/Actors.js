import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NoImageSrc from '../../assets/img/no-image.png';

const Actors = ({ movie }) => {
  const [actors, setActors] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState(12);

  React.useEffect(() => {
    fetch(`/movie/actors/${movie.id}`)
      .then((res) => res.json())
      .then((data) => setActors(data.actors.cast));
  }, []);

  const pagination = (data, page, rows) => {
    let trimStart = (page - 1) * rows;
    let trimEnd = trimStart + rows;

    let trimmedData = data.slice(trimStart, trimEnd);
    let pages = Math.ceil(data.length / rows);

    return { data: trimmedData, pages: pages };
  };

  let actorsArray = pagination(actors, page, rows);
  let item = [];

  const items = () => {
    for (let i = 0; i < actorsArray.pages; i++) {
      item.push(
        <PageButton
          onClick={(e) => {
            setPage(Number(e.currentTarget.id));
          }}
          id={i + 1}
          key={i + 1}
        >
          {i + 1}
        </PageButton>
      );
    }
  };

  items();
  return (
    <Wrapper>
      <Container>
        <h1>Actors</h1>
        <ActorsGrid>
          {actorsArray.data.map((actor) => {
            return (
              <ActorProfile key={actor.id} to={`/actor/${actor.id}`}>
                <img
                  src={
                    actor.profile_path !== null
                      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                      : `${NoImageSrc}`
                  }
                  alt=''
                />
                <p>{actor.name}</p>
              </ActorProfile>
            );
          })}
        </ActorsGrid>
        {item}
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
  text-align: center;

  p {
    line-height: 1;
    margin-bottom: 10px;
  }
`;

const ActorsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  justify-items: center;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const ActorProfile = styled(Link)`
  img {
    height: 150px;
  }
`;

const PageButton = styled.button`
  background-color: #000;
  color: #fff;
  height: 30px;
  width: 30px;
  border: none;
  margin: 5px;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #e50914;
  }
`;
export default Actors;
