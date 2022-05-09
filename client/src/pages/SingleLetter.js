import styled from "styled-components";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Comment from "../components/Comment";
import { useCallback, useEffect, useRef, useState } from "react";
import useCommentInfinite from "../Hooks/useCommentInfinite";
import { useSelector } from "react-redux";
import ModalReport from "../components/ModalReport";
import axios from "../misc/axios";
import { useParams } from "react-router-dom";

const SingleLetter = () => {
  const user = useSelector((state) => state.auth.user);
  const [isComment, setIsComment] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [misc, setMisc] = useState(false);
  const [skip, setSkip] = useState(0);
  const [showReport, setShowReport] = useState(false);
  //dipake buat comment juga
  const [reportLoading, setReportLoading] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportError, setReportError] = useState(false);
  const [commentPost, setCommentPost] = useState("");
  const [totalComment, setTotalComment] = useState(0);
  const [totalLike, setTotalLike] = useState(0);
  const [letter, setLetter] = useState({});
  const { letterid } = useParams();
  const ref = useRef();
  const observer = useRef();
  const { isLoading, isError, comments, isEnd, postComment } =
    useCommentInfinite(skip, commentPost);
  const lastComment = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect(); //disconnect last element yg skr
      observer.current = new IntersectionObserver(
        (entries) => {
          //yang dipantau cuman 1 ref (lastComment), dan kalau muncul dilayar maka consolelog
          if (entries[0].isIntersecting && !isEnd) {
            setSkip(comments?.length);
          }
        },
        { rootMargin: "-10px", threshold: 1 } //div yang dipantau mesti 100% bagiannya ada di layar
      );
      if (node) observer.current.observe(node); //set element baru yg dipantau
    },
    [isLoading, isEnd, comments?.length]
  );

  const handleClose = () => {
    setShowReport(false);
    setMisc(false);
  };

  const handleComment = async () => {
    postComment();
    if (!isError) setCommentPost("");
  };

  const handleReport = async (reason) => {
    setReportLoading(true);
    setReportSuccess(false);
    setReportError(false);
    try {
      await axios.post("/report/", {
        reason: reason,
        letterId: letterid,
        userId: user,
      });
      setReportSuccess(true);
      setTimeout(() => {
        setShowReport(false);
        setReportSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setReportError(true);
    }
    setReportLoading(false);
  };

  const handleLike = async () => {
    try {
      await axios.put(`/letter/${letterid}/like`, {
        userId: user,
      });
      setIsLike(!isLike);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect initial API call
  useEffect(() => {
    const getSingleLetter = async () => {
      try {
        const res = await axios.get(`/letter/${letterid}`);
        setLetter(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleLetter();
  }, [letterid]);

  //useEffect comment count
  useEffect(() => {
    const getCountComment = async () => {
      try {
        const res = await axios.get(`/letter/${letterid}/comment`);
        setTotalComment(res.data[0].totalComment);
      } catch (error) {
        console.log(error);
      }
    };
    getCountComment();
  }, [letterid, comments]);

  //useEffect like count
  useEffect(() => {
    const getCountLike = async () => {
      try {
        const res = await axios.get(`/letter/${letterid}/like`);
        setTotalLike(res.data[0].totalLike);
      } catch (error) {
        console.log(error);
      }
    };
    getCountLike();
  }, [letterid, isLike]);

  //useEffect like or unlike
  useEffect(() => {
    setIsLike(letter?.likes?.includes(user));
  }, [user, letter.likes]);

  //useEffect turnoff scroll if modal open
  useEffect(() => {
    if (showReport) {
      document.body.style.overflow = "hidden";
    }

    return () => (document.body.style.overflow = "unset");
  }, [showReport]);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setMisc(!misc);
      }
    };

    // If the item is active (is open) then listen for clicks
    if (misc) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [misc]);

  return (
    <>
      <Navbar other={true} />
      <Container>
        <Wrapper>
          <LetterContainer>
            <LetterContent style={{ backgroundImage: `url(${letter.image})` }}>
              <Caption>{letter.caption}</Caption>
              <Desc>{letter.bodyDesc}</Desc>
              <Info>
                <p style={{ fontSize: "12px" }}>Sincerely,</p>
                <Author>
                  {letter.isAnonymous ? "Anonymous" : letter.author?.fullname}
                </Author>
                <PostedDate>
                  {new Date(letter.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </PostedDate>
              </Info>
            </LetterContent>
            <ActionWrapper>
              <LeftAction>
                <Button onClick={handleLike} like={isLike} disabled={!user}>
                  {isLike ? (
                    <FavoriteOutlinedIcon fontSize='inherit' />
                  ) : (
                    "Like"
                  )}
                </Button>
                <Status>
                  {totalLike} Likes, {totalComment} Comments
                </Status>
              </LeftAction>
              <RightAction>
                <Button onClick={() => setMisc(!misc)}>
                  <MoreHorizOutlinedIcon fontSize='inherit' />
                </Button>

                <MiscDiv ref={ref} misc={misc}>
                  <p
                    style={{ cursor: user ? "pointer" : "not-allowed" }}
                    onClick={() => user && setShowReport(true)}
                  >
                    Report
                  </p>
                </MiscDiv>
              </RightAction>
            </ActionWrapper>

            {user && (
              <TextComment
                placeholder='Add your comment here...'
                onFocus={() => {
                  setIsComment(true);
                }}
                isComment={isComment}
                value={commentPost}
                onChange={(e) => setCommentPost(e.target.value)}
              />
            )}
            {isComment && <ComButton onClick={handleComment}>Post</ComButton>}
            <CommentWrapper>
              {comments?.map((item, index) => {
                if (comments?.length === index + 1) {
                  return (
                    <div key={item._id} ref={lastComment}>
                      <Comment item={item} />
                    </div>
                  );
                } else {
                  return <Comment key={item._id} item={item} />;
                }
              })}
              {isLoading && (
                <p style={{ textAlign: "center" }}>
                  <Loading />
                </p>
              )}
              {isError && (
                <p
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "14px",
                  }}
                >
                  Something went wrong!
                </p>
              )}
              {isEnd && comments.length !== 0 && (
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  END OF COMMENT
                </p>
              )}
            </CommentWrapper>
          </LetterContainer>
        </Wrapper>
        <ModalReport
          show={showReport}
          close={handleClose}
          handleReport={handleReport}
          reportLoading={reportLoading}
          reportError={reportError}
          reportSuccess={reportSuccess}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LetterContainer = styled.div`
  width: 50%;
  margin-top: 20px;
  padding: 30px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;

  @media only screen and (max-width: 820px) {
    width: 80%;
  }

  @media only screen and (max-width: 420px) {
    width: 90%;
  }
`;

const LetterContent = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-repeat: round;
  background-size: cover;
`;

const Caption = styled.h2`
  font-family: "Oswald";
  margin: 10px 30px;

  @media only screen and (max-width: 820px) {
    font-size: 20px;
  }
`;

const Desc = styled.p`
  font-family: "Cardo";
  font-size: 18px;
  margin: 20px 30px;
  white-space: pre-line;

  @media only screen and (max-width: 820px) {
    font-size: 16px;
  }
`;

const Info = styled.div`
  margin-bottom: 20px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  text-align: end;
`;

const Author = styled.span`
  font-weight: 700;
  font-size: 12px;

  @media only screen and (max-width: 420px) {
    font-size: 12px;
  }
`;

const PostedDate = styled.span`
  font-size: 12px;
  font-style: italic;

  @media only screen and (max-width: 820px) {
    font-size: 10px;
  }
`;

const ActionWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  align-items: center;
  background-color: ${(props) => (props.like ? "#f0f0f0" : "white")};
  color: ${(props) => (props.like ? "#fa8072" : "black")};
  padding: 8px 16px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  transition: ease all 0.3s;

  &:hover {
    border: ${(props) =>
      props.disabled ? "1px solid #d9d9d9" : "1px solid black"};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

const Status = styled.span`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const LeftAction = styled.div`
  justify-content: space-between;
`;

const RightAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MiscDiv = styled.div`
  padding: 10px;
  position: absolute;
  background-color: white;
  top: 25px;
  right: 45px;
  border-radius: 5px;
  font-size: 14px;
  opacity: ${(props) => (props.misc ? "1" : "0")};
  visibility: ${(props) => (props.misc ? "visible" : "hidden")};
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  transform: ${(props) =>
    props.misc ? "translateY(0px)" : "translateY(-20px)"};
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
`;

const CommentWrapper = styled.div``;

const TextComment = styled.textarea`
  margin-top: 10px;
  width: 97%;
  padding: 8px;
  height: ${(props) => (props.isComment ? "60px" : "20px")};
  resize: none;
  background-color: #f0f0f0;
  border: none;
  outline: none;
  transition: ease all 0.3s;

  /* &:focus {
    height: 60px;
  } */
`;

const ComButton = styled.button`
  padding: 8px 16px;
  margin-top: 5px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  outline: none;
  font-weight: 700;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

export default SingleLetter;
