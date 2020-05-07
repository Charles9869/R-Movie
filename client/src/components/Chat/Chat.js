import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useAuth0 } from '../SignIn/react-auth0-spa';

const socket = io.connect('http://localhost:3000');

const Chat = () => {
  const [state, setState] = React.useState({ message: '', name: '' });
  const [chat, setChat] = React.useState([]);
  const { user } = useAuth0();

  React.useEffect(() => {
    socket.on('message', ({ name, message }) => {
      // If user is connected user is own nickname from gmail account
      if (user) setChat([...chat, { name: name, message }]);
      else setChat([...chat, { name, message }]);
    });
  });

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = () => {
    const { name, message } = state;

    socket.emit('message', { name, message });
    setState({ message: '', name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <Name>
          {name}: <span style={{ color: '#000' }}>{message}</span>
        </Name>
      </div>
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onMessageSubmit();
  };

  return (
    <div style={{ height: '80vh' }}>
      <NameContainer>
        <h1 style={{ textAlign: 'center' }}>Welcome on R@Movie Chat</h1>
        <input
          name='name'
          onChange={(e) => onTextChange(e)}
          value={state.name}
          label='Name'
          placeholder='Enter your name...'
        />
      </NameContainer>
      <Container>
        <div
          style={{
            height: '100%',
          }}
        >
          {renderChat()}
        </div>
      </Container>
      <InputContainer>
        <Button style={{ height: '100%' }} onClick={onMessageSubmit}>
          Send
        </Button>
        <input
          name='message'
          onChange={(e) => onTextChange(e)}
          value={state.message}
          placeholder='Enter your message...'
          onKeyPress={handleKeyPress}
        />
      </InputContainer>
    </div>
  );
};

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  box-shadow: 0px 0px 10px 1px #ddd;
  height: 300px;
  position: relative;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 10px;
  height: 40px;
  input {
    width: 100%;
    border-radius: 5px;
    padding-left: 5px;
    border: 1px solid #ddd;
    font-size: 18px;
  }
`;

const Name = styled.h3`
  margin-left: 10px;
  color: #e50914;
`;

const Button = styled.button`
  color: #fff;
  background-color: #e50914;
  width: 80px;
  border: 1px solid #e50914;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 18px;
`;
const NameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;

  input {
    border-radius: 5px;
    height: 38px;
    border: 1px solid #ddd;
    width: 100%;
    margin-bottom: 10px;
    padding-left: 5px;
    font-size: 18px;
  }
`;

export default Chat;
