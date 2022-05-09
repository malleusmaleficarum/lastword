import styled from "styled-components";
import HomeCard from "./HomeCard";

const HomeCards = () => {
  return (
    <Container>
      <Title>POPULAR LETTERS</Title>
      <CardContainer>
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </CardContainer>
      <More>See another letters</More>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 50px;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 34px;
  color: #333333;
  margin-bottom: 10px;
  letter-spacing: -1px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const More = styled.div`
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

export default HomeCards;
