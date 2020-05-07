import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const Star = ({ average }) => {
  const [rating, SetRating] = React.useState(average);

  const onStarClick = (nextValue) => SetRating(nextValue);

  return (
    <StarRatingComponent
      name='rate1'
      starCount={10}
      value={rating}
      onStarClick={onStarClick}
      starColor={'#E50914'}
      value={rating}
      editing={false}
    />
  );
};

export default Star;
