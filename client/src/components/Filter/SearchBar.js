import React from 'react';
import styled from 'styled-components';
import { SearchInput, Button } from 'evergreen-ui';
import { useDispatch } from 'react-redux';

// Import all components
import MovieList from '../MovieList';

import { receiveAllMovieInfo } from '../../actions/actions';

const SearchBar = () => {
  // Will keep the movie input in state to fetch based on the query
  const [movieSearchInput, setMovieSearchInput] = React.useState('');
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  // Searches a movie based on the name
  const searchMovie = () => {
    fetch(`/movie?name=${movieSearchInput}`)
      .then((res) => res.json())
      .then((data) => {
        const { movies } = data;
        dispatch(receiveAllMovieInfo(movies.results));
      });

    window.localStorage.setItem('isFiltered', true);
  };

  // User can press enter to search a movie
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovie();
      setValue('');
    }
  };

  return (
    <React.Fragment>
      <SearchBarWrapper>
        <Container>
          <Input
            placeholder='Search movies...'
            width='100%'
            onChange={(e) => {
              setValue(e.target.value);
              setMovieSearchInput(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            value={value}
          ></Input>
          <SearchButton
            disabled={!movieSearchInput.length > 0}
            height={35}
            appearance='minimal'
            iconBefore='search'
            onClick={() => {
              searchMovie();
              setValue('');
            }}
          >
            Search
          </SearchButton>
        </Container>
      </SearchBarWrapper>
      <MovieList movieSearchInput={movieSearchInput} />
    </React.Fragment>
  );
};

const SearchBarWrapper = styled.div`
  height: 80px;
  background-color: #1c1c1c;
  position: relative;
`;

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Input = styled(SearchInput)`
  background-color: #363636;
  width: 95%;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  ::placeholder {
    color: #fff;
  }
`;

const SearchButton = styled(Button)`
  background-color: #363636;
  color: #fff;
  transition: all 200ms ease-in-out;
  border: 1px solid #363636;
  border-radius: 10px;
  &:hover {
    color: #e50914;
    border: 1px solid #e50914;
  }
`;
export default SearchBar;
