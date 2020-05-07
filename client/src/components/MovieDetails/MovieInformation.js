import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import StoryLine from './StoryLine';
import Poster from './Poster';
import Details from './Details';
import Actors from '../Actors';
import { addToWatchlist } from '../../actions/actions';
import { useAuth0 } from '../SignIn/react-auth0-spa';
import { formatAuthKey } from '../../utils/helpers';

const MovieInformation = ({ movie }) => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const watchlist = useSelector((state) => state.watchlist);
  const [watchlistArray, setWatchlistArray] = React.useState([]);
  const [added, setAdded] = React.useState(false);

  const handleWatchList = () => {
    if (
      !watchlistArray.find((element) => element.id === movie.id) &&
      !watchlist.find((element) => element.id === movie.id)
    ) {
      fetch('/user/watchlist', {
        method: 'POST',
        body: JSON.stringify({
          _id: formatAuthKey(user.sub),
          movie: movie,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      dispatch(addToWatchlist(movie));
    } else {
      alert('Movie already in watchlist!');
    }
  };

  React.useEffect(() => {
    if (user) {
      fetch(`/user/getwatchlist?_id=${formatAuthKey(user.sub)}`)
        .then((res) => res.json())
        .then((data) => setWatchlistArray(data.watchlist));
    }
  }, [watchlist]);

  return (
    <React.Fragment>
      {movie.length !== 0 && (
        <Wrapper>
          <Poster movie={movie} />
          {user && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <AddButton
                onClick={() => {
                  setAdded(true);
                  handleWatchList();
                }}
                exists={
                  watchlistArray.find((element) => element.id === movie.id) ||
                  added
                }
                disabled={
                  watchlistArray.find((element) => element.id === movie.id) ||
                  added
                }
              >
                {!watchlistArray.find(
                  (element) => element.id === movie.id || added
                )
                  ? 'Add to watchlist'
                  : 'Already in watchlist'}
              </AddButton>
            </div>
          )}

          <StoryLine movie={movie} />
          <Details movie={movie} />
          <Actors movie={movie} />
        </Wrapper>
      )}
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;

const AddButton = styled.button`
  background-color: ${(props) => (props.exists ? 'red' : 'green')};
  cursor: pointer;
  color: #fff;
  border: none;
  margin-bottom: 10px;
  padding: 5px;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #363636;
  }
`;

export default MovieInformation;
