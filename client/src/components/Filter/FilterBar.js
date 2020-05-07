import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Select, Button } from 'evergreen-ui';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import genres data
import { genres, pages } from '../../data';
import {
  requestAllMovieInfo,
  receiveAllMovieInfo,
} from '../../actions/actions';

const FilterBar = () => {
  const [yearFrom, setYearFrom] = React.useState('');
  const [yearTo, setYearTo] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [page, setPage] = React.useState(1);

  const dispatch = useDispatch();

  const fetchFilteredMovie = () => {
    dispatch(requestAllMovieInfo());
    fetch(
      `/movie/filter?year=${10}&category=${category}&page=${page}&from=${yearFrom}&to=${yearTo}`
    )
      .then((res) => res.json())
      .then((data) => {
        const { movies } = data;
        dispatch(receiveAllMovieInfo(movies.results));
      });
  };

  const resetMovies = () => {
    dispatch(requestAllMovieInfo());
    fetch(`/popular-movies?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        const { movies } = data;
        dispatch(receiveAllMovieInfo(movies.results));
      });
  };

  return (
    <FilterBarWrapper>
      <FilterWrapper>
        <Page onChange={(e) => setPage(e.target.value)} width='10%'>
          <option value={''}>Page</option>
          {pages.map((page) => {
            return (
              <option key={page} value={page}>
                {page}
              </option>
            );
          })}
          )}
        </Page>
        <Category onChange={(e) => setCategory(e.target.value)} width='10%'>
          <option value={''}>Category</option>
          {genres.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </Category>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <DateSelection
            selected={yearFrom}
            onChange={(date) => setYearFrom(date)}
            placeholderText={format(new Date(), 'LL/dd/yyyy')}
          />
          <DateSelection
            selected={yearTo}
            onChange={(date) => {
              setYearTo(date);
            }}
            placeholderText={format(new Date(), 'LL/dd/yyyy')}
          />
        </div>
      </FilterWrapper>
      <FilterButtonsContainer>
        <FilterButton
          appearance='minimal'
          intent='success'
          iconAfter='caret-down'
          onClick={() => {
            fetchFilteredMovie();
            setYearFrom(null);
            setYearTo(null);
          }}
        >
          Filter
        </FilterButton>
        <FilterButton
          appearance='minimal'
          onClick={() => {
            resetMovies();
          }}
        >
          Reset
        </FilterButton>
      </FilterButtonsContainer>
    </FilterBarWrapper>
  );
};

const DateSelection = styled(DatePicker)`
  margin-right: 10px;
  width: 70px;
  text-align: center;
`;

const FilterBarWrapper = styled.div`
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  padding: 5px;

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const FilterButton = styled(Button)`
  background-color: #1c1c1c;
  color: #fff;
  transition: all 200ms ease-in-out;
  margin-left: 10px;
  &:hover {
    color: #000;
  }
`;

const FilterButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    padding: 5px 0px;
  }
`;

const Category = styled(Select)`
  max-width: 100px;
  margin-right: 10px;
`;

const Page = styled(Select)`
  max-width: 70px;
  margin-right: 10px;
`;

export default FilterBar;
