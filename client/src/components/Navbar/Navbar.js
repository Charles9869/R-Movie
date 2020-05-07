import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Avatar } from 'evergreen-ui';

// Authentication
import { useAuth0 } from '../SignIn/react-auth0-spa';

const Navbar = () => {
  const { isAuthenticated, loginWithPopup, logout, user } = useAuth0();

  return (
    <NavbarWrapper>
      <Nav>
        <LogoWrapper>
          <Logo to='/'>
            <h1>
              R<span style={{ color: '#E50914' }}>+</span>Movie
            </h1>
          </Logo>
          {isAuthenticated && (
            <NavbarLink
              exact
              to='/watchlist'
              activeStyle={{ color: '#E50914' }}
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
          <NavbarLink exact to='/' activeStyle={{ color: '#E50914' }}>
            Home
          </NavbarLink>
          <NavbarLink exact to='/chat' activeStyle={{ color: '#E50914' }}>
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
              {user && <Avatar src={`${user.picture}`} size={50} />}
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
  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(NavLink)`
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
    color: #e50914;
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
    color: #e50914;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Navbar;
