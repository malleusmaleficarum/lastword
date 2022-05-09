import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import axios from "../misc/axios";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const query = useLocation().search;

  const handleSubmit = async () => {
    if (password !== "") {
      setLoading(true);
      setSuccess(false);
      try {
        await axios.post(`/auth/resetPassword/user${query}`, {
          password: password,
        });
        setWarning(true);
        setPassword("");
        setSuccess(true);
      } catch (error) {
        console.log(error);
        setSuccess(false);
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
            <Title>CHANGE PASSWORD</Title>
            {warning && success && <Ann>Password Has Been Changed</Ann>}
            <Input
              type='password'
              placeholder='Insert your new password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
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

export default ChangePassword;
