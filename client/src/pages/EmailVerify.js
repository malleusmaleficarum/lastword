import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../misc/axios";
import { useParams } from "react-router-dom";

const EmailVerify = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    let isMounted = true;
    const verify = async () => {
      try {
        await axios.post(`/auth/${params.id}/verify/${params.token}`);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    isMounted && verify();

    //clean up
    return () => {
      isMounted = false;
    };
  }, [params.id, params.token]);

  return (
    <Container>
      <Navbar other={true} />
      <Wrapper>
        {loading ? (
          "Loading..."
        ) : (
          <>
            <Desc>YOUR ACCOUNT HAS BEEN VERIFIED</Desc>
            <Back to='/login'>Please Login to Continue</Back>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Desc = styled.h3`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Oswald";
`;

const Back = styled(Link)`
  text-decoration: underline;
  color: black;
  font-size: 14px;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: underline;
  }
`;

export default EmailVerify;
