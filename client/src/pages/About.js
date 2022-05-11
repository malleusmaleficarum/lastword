import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar other={true} />
      <Container>
        <Wrapper>
          <AboutContainer>
            <Title>About</Title>

            <Caption>Who we are:</Caption>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              vulputate convallis consequat. Fusce vehicula lacus sed finibus
              tempus. Nullam scelerisque purus ac facilisis sagittis. Curabitur
              in ullamcorper velit. Nunc et mollis purus. Integer mattis felis
              vitae commodo tempus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos.
            </Text>
            <Caption>Our philosopy:</Caption>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              vulputate convallis consequat. Fusce vehicula lacus sed finibus
              tempus. Nullam scelerisque purus ac facilisis sagittis.
            </Text>
            <Caption>Terms, Pivacy, and Policy:</Caption>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse ac purus sapien. Vestibulum id sapien sit amet nisi
              condimentum condimentum. Donec libero quam, accumsan vitae quam
              ac, ultricies scelerisque turpis. Nam sagittis consequat
              fermentum. Pellentesque at eros vitae eros interdum suscipit.
              Proin posuere arcu mauris, vitae congue ante facilisis eget.
              Curabitur eget venenatis magna. Quisque mollis ligula nisi,
              placerat molestie ligula scelerisque vel. Sed vehicula ex et
              consequat tristique. Fusce porta, lorem in scelerisque ultricies,
              felis ipsum accumsan nibh, ut consequat nulla ligula a ante. Sed
              semper nisi ac lacinia sagittis. Mauris at faucibus ipsum. Nullam
              et elit placerat, vehicula.
            </Text>
            <Caption>Contacts:</Caption>
            <Text>
              Email: <br />
              Phone:
            </Text>
          </AboutContainer>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 110px;
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutContainer = styled.div`
  width: 70%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;

  @media only screen and (max-width: 820px) {
    width: 80%;
  }

  @media only screen and (max-width: 390px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-family: "Oswald";
`;

const Caption = styled.h3`
  margin-bottom: 5px;
  font-family: "Oswald";
  color: #7f7f7f;
`;

const Text = styled.span`
  margin-bottom: 20px;
  font-size: 16px;
`;

export default About;
