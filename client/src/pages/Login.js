import styled from "styled-components";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import axios from "../misc/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from "../redux/authRedux";
import { Link } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Min 3 character")
    .required("*Username required"),
  password: Yup.string().required("*Password required"),
});

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const globalState = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    setLoading(true);
    dispatch(LOGIN_START());
    try {
      const res = await axios.post("/auth/login", {
        username: values.username,
        password: values.password,
      });
      // const username = res?.data?.others.username;
      // const accessToken = res?.data?.accessToken;
      //set resdata to GLOBAL STATE
      if (res.data) {
        setError(false);
        setLoading(false);
        localStorage.setItem("userid", JSON.stringify(res.data.others._id));
        dispatch(LOGIN_SUCCESS(res.data.others._id));
      }
    } catch (err) {
      dispatch(LOGIN_FAIL());
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  // const handleGetUser = async () => {
  //   try {
  //     const response = await axios.get("/user/", {
  //       headers: { authorization: `Bearer ${globalState.accessToken}` },
  //     });
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Navbar other={true} />
      <Container>
        <LoginContainer>
          <Wrapper>
            <Title>LOGIN</Title>
            {error && <Error>SOMETHING WENT WRONG</Error>}
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              <Form2>
                <Input
                  placeholder='Username'
                  type='text'
                  name='username'
                  autoComplete='off'
                />
                <ErrMsg name='username' component='div' />
                <Input
                  placeholder='Password'
                  type='password'
                  name='password'
                  autoComplete='off'
                />
                <ErrMsg name='password' component='div' />
                <Button type='submit'>
                  {loading ? "Loading..." : "LOGIN"}
                </Button>
              </Form2>
            </Formik>
            <LinkContainer>
              <StyledLink to='/forgotPassword'>
                <LinkHelp>Forgot your password?</LinkHelp>
              </StyledLink>
              <StyledLink to='/register'>
                <LinkHelp style={{ textAlign: "end" }}>
                  Create an account
                </LinkHelp>
              </StyledLink>
            </LinkContainer>
          </Wrapper>
        </LoginContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 110px;
`;

const LoginContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  border: 1px solid #f0f0f0;
  width: 30%;
  padding: 20px;
  border-radius: 10px;

  @media only screen and (max-width: 820px) {
    width: 70%;
  }

  @media only screen and (max-width: 390px) {
    width: 80%;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-family: "Oswald";
`;

const Error = styled.div`
  background-color: #f16461;
  color: white;
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  padding: 8px 0;
`;

const Form2 = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const Input = styled(Field)`
  margin-top: 15px;
  padding: 8px;
  background-color: #f0f0f0;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0;
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

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LinkHelp = styled.span`
  flex: 1;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ErrMsg = styled(ErrorMessage)`
  padding-left: 5px;
  color: red;
  font-size: 12px;
`;

const StyledLink = styled(Link)`
  color: #232323;
  text-decoration: none;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default Login;
