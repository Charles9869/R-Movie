import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Textarea, Button } from 'evergreen-ui';
import { useAuth0 } from '../SignIn/react-auth0-spa';
import { addComment } from '../../actions/actions';
import Comments from '../Comments';

const CommentBar = ({ id }) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [comment, setComment] = React.useState('');
  const dispatch = useDispatch();

  // Post the comment on the server
  const handleComments = () => {
    fetch('/movie/comment', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        comment: comment,
        name: user.nickname,
        src: user.picture,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Adds the new comments to the state
    dispatch(
      addComment({ name: user.nickname, comment: comment, src: user.picture })
    );
  };
  return (
    <>
      <Wrapper>
        <Container>
          <h1>Comments</h1>
          {isAuthenticated ? (
            <CommentsContainer>
              <TextArea
                name='textarea-1'
                placeholder='Enter your comment...'
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></TextArea>
              <button
                style={{
                  maxWidth: '100px',
                  marginTop: '10px',
                }}
                disabled={!comment.length > 0}
                onClick={() => {
                  handleComments();
                  setComment('');
                }}
              >
                Comments
              </button>
            </CommentsContainer>
          ) : (
            <React.Fragment>
              <p>You need to be logged in</p>
              <Button onClick={() => loginWithRedirect({})}>Login</Button>
            </React.Fragment>
          )}
        </Container>
      </Wrapper>
      {id !== undefined && <Comments id={id} />}
    </>
  );
};

const Wrapper = styled.div`
  border-top: 1px solid #000;
  width: 60%;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;

  p {
    line-height: 1;
  }
`;

const TextArea = styled(Textarea)`
  resize: none;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CommentBar;
