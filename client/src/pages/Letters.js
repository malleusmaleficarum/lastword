import styled from "styled-components";
import Letter from "../components/Letter";
import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useCallback, useRef, useState } from "react";
import useLetterInfinite from "../Hooks/useLetterInfinite";
import Loading from "../components/Loading";

const Letters = () => {
  const [sort, setSort] = useState("newest");
  const [skip, setSkip] = useState(0);
  const { isLoading, isError, letters, isEnd } = useLetterInfinite(skip, sort);
  const observer = useRef();
  const lastLetter = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect(); //disconnect last element yg skr
      observer.current = new IntersectionObserver(
        (entries) => {
          //yang dipantau cuman 1 ref (lastComment), dan kalau muncul dilayar maka consolelog
          if (entries[0].isIntersecting && !isEnd) {
            setSkip(letters?.length);
          }
        },
        { rootMargin: "-10px", threshold: 1 } //div yang dipantau mesti 100% bagiannya ada di layar
      );
      if (node) observer.current.observe(node); //set element baru yg dipantau
    },
    [isLoading, isEnd, letters?.length]
  );

  //useEffect Sorting
  // useEffect(() => {
  //   if (sort === "newest") {
  //     letters?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //   } else if (sort === "oldest") {
  //     letters?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  //   }
  // }, [letters, sort]);

  const handleSortNew = () => {
    if (sort !== "newest") {
      setSkip(0);
      setSort("newest");
    }
  };

  const handleSortOld = () => {
    if (sort !== "oldest") {
      setSkip(0);
      setSort("oldest");
    }
  };

  const handleSortMostLike = () => {
    if (sort !== "most_liked") {
      setSkip(0);
      setSort("most_liked");
    }
  };

  return (
    <>
      <Navbar other={true} />
      <Container>
        <Wrapper>
          <ContentContainer>
            <TopPart>
              <Title>LETTERS</Title>
              {/* <SearchContainer>
              <Search placeholder='Search...' />
              <SearchOutlinedIcon style={{ cursor: "pointer" }} />
            </SearchContainer> */}
            </TopPart>
            <MiddlePart>
              <ButtonFilter
                onClick={handleSortNew}
                style={{
                  backgroundColor: `${
                    sort === "newest" ? "#f0f0f0" : "#232323"
                  }`,
                  color: `${sort === "newest" ? "#232323" : "#f0f0f0"}`,
                }}
              >
                NEWEST
              </ButtonFilter>
              <ButtonFilter
                onClick={handleSortOld}
                style={{
                  backgroundColor: `${
                    sort === "oldest" ? "#f0f0f0" : "#232323"
                  }`,
                  color: `${sort === "oldest" ? "#232323" : "#f0f0f0"}`,
                }}
              >
                OLDEST
              </ButtonFilter>
              <ButtonFilter
                onClick={handleSortMostLike}
                style={{
                  backgroundColor: `${
                    sort === "most_liked" ? "#f0f0f0" : "#232323"
                  }`,
                  color: `${sort === "most_liked" ? "#232323" : "#f0f0f0"}`,
                }}
              >
                MOST LIKED
              </ButtonFilter>
            </MiddlePart>
            {/*letters.map((letter) => {
            return (
              <StyledLink key={letter._id} to={`/letter/${letter._id}`}>
                <Letter ref={lastLetter} letter={letter} />
              </StyledLink>
            );
          })*/}

            {/* */}
            {letters?.map((letter, index) => {
              if (letters?.length === index + 1) {
                return (
                  <div key={letter._id} ref={lastLetter}>
                    <Letter letter={letter} />
                  </div>
                );
              } else {
                return <Letter key={letter._id} letter={letter} />;
              }
            })}
            {isLoading && (
              <p style={{ textAlign: "center", marginTop: "10px" }}>
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
            {isEnd && letters.length !== 0 && (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                -- END OF CONTENT --
              </p>
            )}
          </ContentContainer>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 110px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  background-color: white;

  @media only screen and (max-width: 820px) {
    width: 70%;
  }

  @media only screen and (max-width: 420px) {
    width: 80%;
  }
`;

const TopPart = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  text-align: start;
  font-family: "Oswald";
`;

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
//   border: 1px solid black;
//   background-color: #f0f0f0;
//   border-radius: 10px;
// `;

// const Search = styled.input`
//   padding: 8px 16px;
//   background-color: #f0f0f0;
//   outline: none;
//   border: none;
//   border-radius: 10px;
// `;

const MiddlePart = styled.div`
  display: flex;
`;

const ButtonFilter = styled.button`
  margin-right: 10px;
  padding: 0.9rem;
  background-color: #232323;
  color: #9e9e9e;
  border-radius: 50px;
  border: 1px solid #282828;
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    /* color: #eaeaea; */
    opacity: 0.7;
  }

  @media only screen and (max-width: 820px) {
  }

  @media only screen and (max-width: 420px) {
    font-size: 9px;
  }
`;

export default Letters;
