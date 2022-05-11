import styled from "styled-components";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import { Link } from "react-router-dom";

const Letter = ({ letter }) => {
  const date = new Date(letter.createdAt);
  return (
    <Container>
      <StyledLink to={`/letter/${letter._id}`}>
        <Wrapper style={{ background: `url(${letter.image})` }}>
          <Caption>{`"${letter.caption}"`}</Caption>
          {/* <Desc>{letter.bodyDesc}</Desc> */}
          <InfoContainer>
            <Author>
              {`— ${
                letter.isAnonymous
                  ? "Anonymous"
                  : letter?.author_docs[0]?.fullname
              }
            `}
            </Author>
            <PostDate>
              {date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </PostDate>
          </InfoContainer>
        </Wrapper>
        <InteractionContainer>
          <DivIcon>
            <FavoriteOutlinedIcon
              fontSize='sm'
              style={{ marginRight: "5px" }}
            />
            {`${letter.total_likes}`}
          </DivIcon>
          <DivIcon>
            <ChatBubbleOutlinedIcon
              fontSize='sm'
              style={{ marginRight: "5px" }}
            />
            {`${letter.total_comments}`}
          </DivIcon>
        </InteractionContainer>
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  padding: 15px;
  width: 70%;
  min-height: 250px;
  background-color: #f0f0f0;
  color: white;
  border-radius: 10px;
  cursor: pointer;

  box-shadow: -1px 0px 16px -6px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 0px 16px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 0px 16px -6px rgba(0, 0, 0, 0.75);

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  color: #232323;
  margin-bottom: 20px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: cover;
`;

const Caption = styled.h2`
  margin: auto 40px;
  font-family: "Oswald";
  font-size: 30px;

  text-align: center;
  @media only screen and (max-width: 820px) {
    font-size: 26px;
  }

  @media only screen and (max-width: 420px) {
    font-size: 22px;
  }

  overflow-wrap: break-word;
`;

// const Desc = styled.span`
//   font-family: "Cardo";
//   font-size: 16px;
//   letter-spacing: 0.5px;
// `;

const InfoContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 12px;
`;

const Author = styled.span`
  font-family: "Cardo";
  font-weight: 600;
`;

const PostDate = styled.span`
  font-style: italic;
`;

const InteractionContainer = styled.div`
  display: flex;
  gap: 20px;
  color: #232323;
  font-size: 14px;
`;

const DivIcon = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default Letter;
