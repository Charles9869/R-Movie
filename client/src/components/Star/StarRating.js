import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const Star = ({ id }) => {
  const [rating, SetRating] = React.useState(0);
  const [movie, setMovie] = React.useState({});

  // Sets the value of rating based on the star value and
  // trigger the handleVote function which post the vote
  // on the database
  const onStarClick = (value) => {
    SetRating(value);
    handleVote(value);
  };

  const handleVote = (vote) => {
    fetch('/movie/vote', {
      method: 'POST',
      body: JSON.stringify({ id: id, voteValue: vote }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  // When the component runs, it fetches the information about
  // the movie to get the voteCount and voteTotal
  React.useEffect(() => {
    fetch(`/movie/database/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [rating, SetRating]);

  return (
    <React.Fragment>
      <StarRatingComponent
        name='rate1'
        starCount={10}
        value={rating}
        onStarClick={onStarClick}
        starColor={'#E50914'}
        value={rating}
        editing={!rating > 0}
      />
      {/* The results from fetch has to be a success and the voteCount needs to be not undefined */}
      {movie.type === 'success' && movie.movie.voteCount !== undefined && (
        <p style={{ marginLeft: '5px' }}>
          {Math.floor(
            (10 * movie.movie.voteTotal) / (10 * movie.movie.voteCount)
          )}
          / 10
        </p>
      )}
    </React.Fragment>
  );
};

export default Star;
