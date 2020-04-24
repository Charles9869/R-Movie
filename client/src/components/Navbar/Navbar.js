import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { BsFillBookmarkFill } from 'react-icons/bs';

// Authentication
import { useAuth0 } from '../SignIn/react-auth0-spa';

const Navbar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    loginWithPopup,
    logout,
    user,
  } = useAuth0();

  return (
    <NavbarWrapper>
      <Nav>
        <LogoWrapper>
          <Logo href='#'>
            <h1>
              R<span style={{ color: '#73C8AF' }}>@</span>Movie
            </h1>
          </Logo>
          {isAuthenticated && (
            <NavbarLink
              exact
              to='/watchlist'
              activeStyle={{ color: '#73C8AF' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                Watchlist
                <BsFillBookmarkFill
                  style={{ border: 'none', marginLeft: '5px' }}
                />
              </div>
            </NavbarLink>
          )}
        </LogoWrapper>
        <LinkContainer>
          <NavbarLink exact to='/' activeStyle={{ color: '#73C8AF' }}>
            Home
          </NavbarLink>
          <NavbarLink exact to='/chat' activeStyle={{ color: '#73C8AF' }}>
            Chat
          </NavbarLink>
          {/* Checks if user is not logged in */}
          {!isAuthenticated && (
            <AuthButtons onClick={() => loginWithPopup({})}>
              <IconContainer>
                Login
                <FiLogIn style={{ border: 'none', marginLeft: '5px' }} />
              </IconContainer>
            </AuthButtons>
          )}
          {/* Checks if user is logged in */}
          {isAuthenticated && (
            <React.Fragment>
              <AuthButtons onClick={logout}>
                <IconContainer>
                  Logout
                  <FiLogOut style={{ border: 'none', marginLeft: '5px' }} />
                </IconContainer>
              </AuthButtons>
              <Avatar src={`${user.picture}`}></Avatar>
            </React.Fragment>
          )}
        </LinkContainer>
      </Nav>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  width: 100%;
  background-color: #1c1c1c;
  height: 80px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  height: 100%;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  font-size: 20px;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const LinkContainer = styled.ul`
  list-style-type: none;
  display: flex;
`;

const NavbarLink = styled(NavLink)`
  display: inline-block;
  padding: 10px 15px;
  text-decoration: none;
  color: white;
  transition: all 200ms ease-in-out;
  font-size: 18px;
  &:hover {
    color: #73c8af;
  }
`;

const AuthButtons = styled.div`
  display: inline-block;
  padding: 10px 15px;
  text-decoration: none;
  color: white;
  transition: all 200ms ease-in-out;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #73c8af;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

export default Navbar;
