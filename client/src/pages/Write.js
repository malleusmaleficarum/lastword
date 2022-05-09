import styled from "styled-components";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import axios from "../misc/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

const schema = Yup.object().shape({
  caption: Yup.string()
    .required("*Please enter caption field")
    .min(5, "*Min 5 Characters")
    .matches(/^[a-zA-Z ]*$/, "*Only alphabets are allowed for this field"),
  text: Yup.string().required("*Please enter text field").min(10).max(500),
  paper: Yup.string()
    .required("*Please choose 1 paper")
    .typeError("*Please choose 1 paper"),
  anonymous: Yup.boolean().default(false),
});

const Write = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const author = useSelector((state) => state.auth.user);
  const [isCooldown, setIsCooldown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isError, setIsError] = useState(false);
  const [res, setRes] = useState({});

  const handleClickSubmit = (data) => {
    setShowModal(true);
    setRes(data);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleData = async (res) => {
    console.log(res);
    setLoading(true);
    try {
      await axios.post("letter/", {
        caption: res.caption,
        bodyDesc: res.text,
        author: author,
        image: res.paper,
        isAnonymous: res.anonymous,
      });
      reset();
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setShowModal(false);
      setWarning(true);
      setLoading(false);
    }
  };

  //useEffect check lastPost date
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`/user/${author}`);
        const lastPostDate = new Date(user.data.lastPost);
        const cooldownTime = lastPostDate.setDate(lastPostDate.getDate() + 7);
        cooldownTime > new Date() ? setIsCooldown(true) : setIsCooldown(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [author]);

  return (
    <>
      <Navbar other={true} />
      <Container>
        <Wrapper>
          <WriteContainer>
            <Title>WRITE SOMETHING</Title>

            {isCooldown && (
              <p
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                Cannot post another letter, You're still in cooldown
              </p>
            )}
            {warning && (
              <Warning error={isError}>
                {isError
                  ? "SORRY, SOMETHING WENT WRONG"
                  : "YOUR LETTER HAS BEEN POSTED"}
              </Warning>
            )}
            <FormContainer onSubmit={handleSubmit(handleClickSubmit)}>
              <Label>Caption:</Label>

              <InputText
                placeholder='Add your caption'
                type='text'
                autoComplete='off'
                disabled={isCooldown}
                {...register("caption")}
              />
              <Par>{errors.caption?.message}</Par>
              <AreaWrapper>
                <Label>Your Last Word:</Label>
                <InputArea
                  placeholder='Add your last word'
                  autoComplete='off'
                  disabled={isCooldown}
                  {...register("text")}
                />

                <Par>{errors.text?.message}</Par>
              </AreaWrapper>
              <RadioWrapper>
                <Label>Choose a paper that you want to use:</Label>
                <div style={{ display: "flex" }}>
                  <Label>
                    <InputRadio
                      type='radio'
                      value='https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/paper%2Fletter1.jpg?alt=media&token=05a3f8a9-804a-4e0f-bef3-0207a4ca80fa'
                      {...register("paper")}
                    />
                    <img
                      src='https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/paper%2Fletter1.jpg?alt=media&token=05a3f8a9-804a-4e0f-bef3-0207a4ca80fa'
                      alt=''
                    />
                  </Label>
                  <Label>
                    <InputRadio
                      type='radio'
                      value='https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/paper%2Fletter2.jpg?alt=media&token=8fc8868a-6875-42d0-b512-c56fe97fcbe8'
                      {...register("paper")}
                    />
                    <img
                      src='https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/paper%2Fletter2.jpg?alt=media&token=8fc8868a-6875-42d0-b512-c56fe97fcbe8'
                      alt=''
                    />
                  </Label>
                  <Label>
                    <InputRadio
                      type='radio'
                      value='https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/paper%2Fletter3.jpg?alt=media&token=d0a99c3c-e6e8-45d5-8913-dd9a16bad20e'
                      {...register("paper")}
                    />
                    <img
                      src='https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/paper%2Fletter3.jpg?alt=media&token=d0a99c3c-e6e8-45d5-8913-dd9a16bad20e'
                      alt=''
                    />
                  </Label>
                  <Par>{errors.paper?.message}</Par>
                </div>
              </RadioWrapper>
              <CheckboxWrapper>
                <label>
                  <InputCheckbox type='checkbox' {...register("anonymous")} />
                  Do you want to post this letter as <b>anonymous</b> ?
                </label>
              </CheckboxWrapper>
              <Button type='submit' disabled={isCooldown}>
                POST
              </Button>
            </FormContainer>
            <Modal
              show={showModal}
              close={handleClose}
              handleData={handleData}
              data={res}
              loading={loading}
            />
          </WriteContainer>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 110px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;
const WriteContainer = styled.div`
  width: 50%;

  @media only screen and (max-width: 820px) {
    width: 70%;
  }

  @media only screen and (max-width: 420px) {
  }
`;

const Warning = styled.div`
  width: 50%;
  margin: 0 auto;
  background-color: ${(props) => (props.error ? "#f16461" : "green")};
  color: white;
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  padding: 8px 0;
`;

const Title = styled.h1`
  font-size: 18px;
  padding: 10px;
  text-align: center;
`;

const FormContainer = styled.form`
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const InputText = styled.input`
  width: 100%;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 600;
  padding: 8px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  outline: none;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: grey;
    opacity: 0.6; /* Firefox */
  }
`;

const AreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  span {
    font-size: 12px;
    font-style: italic;
  }
`;

const InputArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 8px;
  font-size: 16px;
  background-color: #f0f0f0;
  border: none;
  resize: none;
  white-space: pre-line;
  outline: none;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: grey;
    opacity: 0.6; /* Firefox */
  }
`;

const RadioWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 5px;
    font-size: 16px;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
    cursor: pointer;

    @media only screen and (max-width: 820px) {
      width: 80px;
      height: 80px;
    }

    @media only screen and (max-width: 420px) {
      width: 50px;
      height: 50px;
    }
  }

  input:checked + img {
    border: 2px solid #232323;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const InputRadio = styled.input`
  margin-right: 5px;
  text-align: top;
  visibility: hidden;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  label {
    font-size: 14px;
  }
`;

const InputCheckbox = styled.input`
  margin-right: 5px;
`;

const Button = styled.button`
  width: 100px;
  padding: 5px 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  outline: none;
  border: 1px solid black;
  cursor: pointer;
  transition: ease all 0.5s;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const Par = styled.p`
  padding-left: 5px;
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default Write;
