import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import google from "../assets/google-logo.png";
import fb from "../assets/fb-logo.png";
import { useState } from "react";
import axios from "../misc/axios";

const initialValues = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterSchema = Yup.object().shape({
  fullname: Yup.string().min(2, "*Min 2 char").required("*Fullname required"),
  username: Yup.string().min(4, "*Min 4 char").required("*Username required"),
  email: Yup.string()
    .email("*Input valid email address")
    .required("*Email required"),
  password: Yup.string()
    .matches(/(?=.*[A-Z])/, "*At least one uppercase")
    .matches(/(?=.*[a-z])/, "*At least one lowercase")
    .matches(/(?=.*[0-9])/, "*At least one number")
    .min(8, "*Min 8 char")
    .required("*Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "*Password doesnt match")
    .required("*Confirm password required"),
});

const Register = () => {
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("/auth/register", {
        username: values.username,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
      });
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setWarning(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar other={true} />
      <Container>
        <Wrapper>
          <RegisterContainer>
            <Title>REGISTER</Title>
            {warning && (
              <Warning error={error}>
                {error ? "SOMETHING WENT WRONG" : "PLEASE CHECK YOUR EMAIL"}
              </Warning>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={RegisterSchema}
              onSubmit={handleClickSubmit}
            >
              <Form2>
                <Input
                  autoComplete='off'
                  placeholder='Full Name'
                  name='fullname'
                />
                <ErrMsg name='fullname' component='div' />

                <Input
                  autoComplete='off'
                  placeholder='Username'
                  name='username'
                />
                <ErrMsg name='username' component='div' />

                <Input
                  autoComplete='off'
                  placeholder='Email'
                  type='email'
                  name='email'
                />
                <ErrMsg name='email' component='div' />

                <Input
                  placeholder='Password'
                  type='password'
                  name='password'
                  autoComplete='off'
                />
                <ErrMsg name='password' component='div' />

                <Input
                  placeholder='Confirm Password'
                  type='password'
                  name='confirmPassword'
                  autoComplete='off'
                />
                <ErrMsg name='confirmPassword' component='div' />

                <Button type='submit' disabled={loading}>
                  {loading ? "Loading..." : "REGISTER"}
                </Button>
              </Form2>
            </Formik>
            <Other>Or Register With</Other>
            <OtherContainer>
              <OtherLogin src={google} />
              <OtherLogin src={fb} />
            </OtherContainer>
            <Desc>
              By registering to our website, you agree with our{" "}
              <a href='/'>TERMS</a> , <a href='/'>PRIVACY & POLICY</a>
            </Desc>
          </RegisterContainer>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 110px;
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Warning = styled.div`
  background-color: ${(props) => (props.error ? "#f16461" : "green")};
  color: white;
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  padding: 8px 0;
`;

const RegisterContainer = styled.div`
  width: 40%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;

  @media only screen and (max-width: 820px) {
    width: 60%;
  }

  @media only screen and (max-width: 390px) {
    width: 70%;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-family: "Oswald";
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

const Other = styled.span`
  font-size: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const OtherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const OtherLogin = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
  object-fit: cover;

  &:hover {
    opacity: 70%;
  }
`;

const Desc = styled.span`
  font-size: 12px;
  text-align: center;

  a {
    font-weight: 800;
    color: black;

    &:hover {
      opacity: 70%;
    }
  }
`;

const ErrMsg = styled(ErrorMessage)`
  padding-left: 5px;
  color: red;
  font-size: 12px;
`;

export default Register;
