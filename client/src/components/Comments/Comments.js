import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'evergreen-ui';
import { useSelector, useDispatch } from 'react-redux';
import { clearState, receiveAllComments } from '../../actions/actions';

const Comments = ({ id }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  React.useEffect(() => {
    // Removes old comments from other movies
    dispatch(clearState());
    fetch(`/movie/comments/${id}`)
      .then((res) => res.json())
      .then((data) => dispatch(receiveAllComments(data.comments)));
  }, []);

  return (
    <Wrapper>
      {comments !== undefined &&
        comments.map((comment, index) => {
          return (
            <CommentWrapper key={index}>
              <Avatar src={comment.src} size={50} marginRight={10} />
              <InfoContainer>
                <h4>{comment.name}</h4>
                <p>{comment.comment}</p>
              </InfoContainer>
            </CommentWrapper>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  margin-top: 20px;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
  border-top: 1px solid #ddd;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;

  p {
    margin: 0;
    padding: 0;
    line-height: 1;
  }
`;
export default Comments;
