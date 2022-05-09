import styled from "styled-components";

const Container = styled.div`
  padding: 20px 0;
  width: 100%;
  min-height: 250px;
  background-color: #232230;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Quote = styled.span`
  width: 60%;
  color: white;
  font-family: "Cardo";
  font-size: 24px;
  text-align: center;
`;

const Quotes = () => {
  return (
    <Container>
      <Quote>
        “There is an infinite amount of hope in the universe... but not for us“
        <br />— Franz Kafka
      </Quote>
    </Container>
  );
};

export default Quotes;
