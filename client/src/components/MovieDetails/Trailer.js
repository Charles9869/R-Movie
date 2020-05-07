import React from 'react';
import styled from 'styled-components';
import movieTrailer from 'movie-trailer';

const Trailer = ({ title }) => {
  const [link, setLink] = React.useState('');
  const [error, setError] = React.useState(false);

  if (title !== undefined) {
    movieTrailer(title)
      .then((response) =>
        setLink(response.slice(response.indexOf('=') + 1, response.length))
      )
      .catch((err) => setError(true));
  }
  return (
    <Wrapper>
      <Container>
        {!error ? (
          <Frame src={`https://www.youtube.com/embed/${link}`}></Frame>
        ) : (
          <Error>
            <h1>Error! Something went wrong!</h1>
          </Error>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 500px;
  width: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Frame = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Error = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 80%;

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;

export default Trailer;
