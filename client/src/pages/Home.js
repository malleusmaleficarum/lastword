import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import styled from "styled-components";

const Container = styled.div``;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Hero />
    </Container>
  );
};

export default Home;
