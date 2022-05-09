import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import styled from "styled-components";
// import About from "../components/About";
// import Quotes from "../components/Quotes";
// import Footer from "../components/Footer";
// import HomeCards from "../components/HomeCards";

const Container = styled.div``;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Hero />
      {/* <HomeCards />
      <About />
      <Quotes />
      <Footer /> */}
    </Container>
  );
};

export default Home;
