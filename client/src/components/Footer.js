import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <LeftPart>Lastword © - 2022 All Right Reserved</LeftPart>
        <RightPart>
          <MenuItem>FAQ</MenuItem>
          <MenuItem>TERMS & CONDITIONS</MenuItem>
          <MenuItem>PRIVACY & POLICY</MenuItem>
          <MenuItem>CONTACT</MenuItem>
        </RightPart>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  border-top: 1px solid lightgray;
`;

const Wrapper = styled.div`
  padding: 20px 0;
  margin: 0 30px;
  display: flex;
  justify-content: space-between;
  color: #333333;
  font-size: 12px;
`;

const LeftPart = styled.div`
  font-weight: 600;
`;

const RightPart = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  margin-left: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }
`;

export default Footer;
