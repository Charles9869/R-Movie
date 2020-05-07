import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../SignIn/react-auth0-spa';
import { formatAuthKey } from '../../utils/helpers';
import { receiveWatchlist, removeFromWatchlist } from '../../actions/actions';

const Watchlist = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);

  React.useEffect(() => {
    fetch(`/user/getwatchlist?_id=${formatAuthKey(user.sub)}`)
      .then((res) => res.json())
      .then((data) => dispatch(receiveWatchlist(data.watchlist)));
  }, []);

  const handleRemoveMovie = (e) => {
    let item = watchlist.find((movie) => movie.id === parseInt(e.target.id));
    dispatch(removeFromWatchlist(item));
    fetch('/user/watchlist', {
      method: 'DELETE',
      body: JSON.stringify({ _id: user.sub, id: parseInt(e.target.id) }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };
  return (
    <Wrapper>
      <h1>Your watchlist</h1>

      <WatchlistGrid>
        {watchlist.map((movie) => {
          return (
            <MovieItem key={movie.id}>
              <PosterImage to={`/movie/${movie.id}`}>
                <img
                  to={`/movie/${movie.id}`}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=''
                />
              </PosterImage>
              <ButtonRemove id={movie.id} onClick={handleRemoveMovie}>
                Remove
              </ButtonRemove>
            </MovieItem>
          );
        })}
      </WatchlistGrid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  height: calc(100vh - 80px);
`;

const WatchlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  justify-items: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const MovieItem = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    height: 230px;
    transition: all 350ms ease-in-out;

    @media only screen and (max-width: 768px) {
      height: 150px;
    }
  }
`;

const PosterImage = styled(Link)`
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ButtonRemove = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  outline: none;
  margin: 5px 0px 10px 0px;
  padding: 10px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  border: 1px solid #000;

  &:hover {
    color: #e50914;
    border: 1px solid #e50914;
  }
`;

export default Watchlist;
