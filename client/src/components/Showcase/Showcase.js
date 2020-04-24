import React from 'react';
import styled from 'styled-components';

const Showcase = () => {
  const [movieInfo, setMovieInfo] = React.useState([]);

  React.useEffect(() => {
    // Fetch the movie information to display on the showcase
    fetch('/popular-movies')
      .then((res) => res.json())
      .then((data) => {
        const { movies } = data;
        const randomNumber = Math.floor(Math.random() * movies.results.length);
        setMovieInfo(movies.results[randomNumber]);
      });
  }, []);

  return (
    <ShowcaseWrapper>
      <ShowcaseImage
        src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
        alt='showcase-img'
      ></ShowcaseImage>
    </ShowcaseWrapper>
  );
};

const ShowcaseWrapper = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
`;

const ShowcaseImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default Showcase;
