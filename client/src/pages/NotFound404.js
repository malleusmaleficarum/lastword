import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <Container>
      <Navbar other={true} />
      <Wrapper>
        <Desc>SORRY, PAGE NOT FOUND - 404.</Desc>
        <Back to='/'>Return To Home</Back>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Desc = styled.h1`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Oswald";
  @media only screen and (max-width: 420px) {
    font-size: 25px;
  }
`;

const Back = styled(Link)`
  text-decoration: underline;
  color: black;
  font-size: 14px;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: underline;
  }
`;

export default NotFound404;
