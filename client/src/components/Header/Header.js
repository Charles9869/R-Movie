import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';

// Import components

const Header = () => {
  return (
    <NavbarWrapper>
      <Nav>
        <Logo href='#'>
          <h1>
            R<span style={{ color: '#73C8AF' }}>@</span>Movie
          </h1>
        </Logo>
        <LinkContainer>
          <NavbarLink to='/'>Home</NavbarLink>
          <NavbarLink to='/'>
            <IconContainer>
              Login
              <FiLogIn style={{ border: 'none', marginLeft: '5px' }} />
            </IconContainer>
          </NavbarLink>
          <NavbarLink to='/'>
            <IconContainer>
              Logout
              <FiLogOut style={{ border: 'none', marginLeft: '5px' }} />
            </IconContainer>
          </NavbarLink>
        </LinkContainer>
      </Nav>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  border: 2px solid blue;
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

const Logo = styled.a`
  display: inline-block;
  text-decoration: none;
  color: #fff;
  font-size: 20px;
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

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Header;
