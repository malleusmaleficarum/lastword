import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import axios from "../misc/axios";

const ResetPassword = () => {
  const [warning, setWarning] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (email !== "") {
      setLoading(true);
      try {
        await axios.post("/auth/resetPassword", { email });
        setWarning(true);
        setEmail("");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar other={true} />
      <Container>
        <LoginContainer>
          <Wrapper>
            <Title>RESET PASSWORD</Title>
            {warning && <Ann>Please Check Your Email Address</Ann>}
            <Input
              type='email'
              placeholder='Insert your email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "SUBMIT"}
            </Button>
          </Wrapper>
        </LoginContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 70vh;
`;

const LoginContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  border: 1px solid #f0f0f0;
  width: 30%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media only screen and (max-width: 820px) {
    width: 80%;
  }
`;

const Title = styled.h2`
  font-family: "Oswald";
`;

const Ann = styled.div`
  background-color: #3aab58;
  color: white;
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  padding: 8px 0;
`;

const Input = styled.input`
  padding: 8px;
  background-color: #f0f0f0;
  border: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid white;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border: 1px solid black;
    background-color: white;
    color: black;
  }
  &:disabled {
    color: white;
    background-color: gray;
    cursor: not-allowed;
  }
`;

export default ResetPassword;
