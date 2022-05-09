import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HamburgerMenu = ({ hamburger, handleLogout }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container hamburger={hamburger}>
      <MenuList>
        <StyledLink to='/letters'>
          <ListItem>Letters</ListItem>
        </StyledLink>
        <StyledLink to='/about'>
          <ListItem>About</ListItem>
        </StyledLink>

        {user ? (
          <>
            <StyledLink to='/write'>
              <ListItem>Write</ListItem>
            </StyledLink>
            <StyledLink to={`/profile/${user}`}>
              <ListItem>Profile</ListItem>
            </StyledLink>
            <ListItem onClick={handleLogout}>Logout</ListItem>
          </>
        ) : (
          <>
            <StyledLink to='/login'>
              <ListItem>Login</ListItem>
            </StyledLink>

            <StyledLink to='/register'>
              <ListItem>Register</ListItem>
            </StyledLink>
          </>
        )}
      </MenuList>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 90px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #232323;
  z-index: -1;
  transform: ${(props) =>
    props.hamburger ? "translateX(0)" : "translateX(100%)"};
  transition: 0.3s ease all;
`;

const MenuList = styled.ul`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  list-style: none;
  font-weight: 700;
  color: #eaeaea;
`;

const ListItem = styled.li`
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default HamburgerMenu;
