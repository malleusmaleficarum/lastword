import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const HomeCard = () => {
  return (
    <Container>
      <Caption>Dont Feel Sorry For Vincent Van Gogh</Caption>
      <Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam......(show more)
      </Body>
      <InfoWrapper>
        <Interaction>
          <Likes>
            <Icon>
              <FavoriteBorderIcon fontSize='small' />
            </Icon>
            <InfoText>10 Likes</InfoText>
          </Likes>
          <Comments>
            <Icon>
              <ChatBubbleOutlineOutlinedIcon fontSize='small' />
            </Icon>
            <InfoText>5 Comments</InfoText>
          </Comments>
        </Interaction>
        <Info>
          <Author>Bryan Beck</Author>
          <PostedDate>02 March 1999</PostedDate>
        </Info>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  margin: 10px;
  padding: 10px;
  background-color: #eae8df;
  width: 350px;
  height: 350px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const Caption = styled.h2`
  font-family: "Oswald";

  width: 100%;
`;

const Body = styled.span`
  font-family: "Cardo";
  letter-spacing: 0.5px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;

const Interaction = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 5px;
  color: #333333;
  opacity: 60%;
  display: flex;
`;

const InfoText = styled.span`
  font-weight: 200;
  font-size: 11px;
`;

const Comments = styled.div`
  display: flex;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: end;
`;

const Author = styled.span``;

const PostedDate = styled.span`
  font-style: italic;
`;

export default HomeCard;
