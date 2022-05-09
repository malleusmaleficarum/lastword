import styled from "styled-components";
import about from "../assets/about-rain.png";

const About = () => {
  return (
    <Container>
      <LeftPart>
        <Image src={about} alt='image' />
      </LeftPart>
      <RightPart>
        <AboutText>
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.“
        </AboutText>
      </RightPart>
    </Container>
  );
};

const Container = styled.div`
  max-height: 500px;
  display: flex;
`;

const LeftPart = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RightPart = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const AboutText = styled.span`
  margin: 0 50px;
  font-family: "Cardo";
  font-size: 18px;
  text-align: center;
`;

export default About;
