import styled from "styled-components";

const Comment = ({ item }) => {
  return (
    <CommentWrapper>
      <ProfPict
        src={
          !item.userId.image
            ? "https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/user_profile_pict%2F1651779500534blank%20profile.webp?alt=media&token=631f959a-d622-4937-bd07-5a1a43e5392a"
            : item.userId.image
        }
        alt=''
      />
      <Container>
        <Infor>{item.userId.fullname}</Infor>
        <PostedComment>{item.text}</PostedComment>
        <Created>{item.createdAt}</Created>
      </Container>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfPict = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #f0f0f0;
  margin-top: 10px;
  padding: 10px;
`;

const Infor = styled.h3`
  font-size: 14px;
  margin-bottom: 5px;
  letter-spacing: -1px;
`;

const PostedComment = styled.span`
  font-size: 12px;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
`;

const Created = styled.span`
  font-size: 10px;
  font-style: italic;
  color: lightgrey;
`;

export default Comment;
