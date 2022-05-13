import styled from "styled-components";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Container>
      <Image
        src='https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/misc%2Fhero.webp?alt=media&token=6e9a11cc-c1fe-48cb-afef-ab17b82e8733'
        alt='image'
      />
      <InfoWrapper>
        <Heading1>EVERYONE HAS THEIR OWN STORY TO TELL</Heading1>
        <Body>
          No matter if it's about hope, love, wisdom, or maybe pain, just write
          some letters in this app to express what you feel inside.
        </Body>
        <StyledLink to='/letters'>
          <Button>DISCOVER →</Button>
        </StyledLink>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: #fefefe;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

// const Layer = styled.div`
//   width: 100%;
//   height: 100vh;
//   z-index: 1;
//   background: rgba(0, 0, 0, 0.4);
//   background-image: linear-gradient(
//     to top,
//     rgba(0, 0, 0, 0.7) 0,
//     rgba(0, 0, 0, 0) 60%,
//     rgba(0, 0, 0, 0.7) 100%
//   );
// `;

const InfoWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 8vmin;

  @media only screen and (max-width: 820px) {
    bottom: 11%;
  }

  @media only screen and (max-width: 390px) {
  }
`;

const Heading1 = styled.h1`
  font-family: "Oswald";
  font-size: 40px;
  text-align: center;
  color: #fefefe;

  @media only screen and (max-width: 820px) {
    font-size: 32px;
  }

  @media only screen and (max-width: 390px) {
    font-size: 28px;
  }
`;

const Body = styled.span`
  font-family: "Cardo";
  font-size: 18px;
  text-align: center;
  color: #ececec;
  margin: 20px 0;
  letter-spacing: 1.5px;

  @media only screen and (max-width: 390px) {
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-weight: 600;
  color: white;
  background-color: transparent;
  outline: none;
  border: 1px solid white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    opacity: 70%;
  }
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

export default Hero;
