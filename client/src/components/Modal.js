import styled from "styled-components";
import Loading from "./Loading";

const Modal = ({ show, close, handleData, data, loading }) => {
  if (!show) return null;

  return (
    <Container onClick={close}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Close>
          <span onClick={close}>X</span>
        </Close>
        <Title>Your Post Almost Ready</Title>
        <Desc>
          Reminder: You can only post 1 letter a month. After you post this
          letter you will need to wait for a month to make another letter. If
          you are agree, please click OK
        </Desc>
        <ButtonWrapper>
          <Button onClick={() => handleData(data)} disabled={loading}>
            {loading ? <Loading /> : "OK"}
          </Button>
          <Button onClick={close} disabled={loading}>
            CANCEL
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 450px;
  min-height: 230px;
  background-color: white;
  overflow-y: hidden;
`;

const Close = styled.div`
  font-weight: 700;
  text-align: end;
  color: lightgray;
  span {
    cursor: pointer;
    transition: ease all 0.3s;
    &:hover {
      color: black;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
`;

const Desc = styled.p`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  font-weight: 700;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 60%;
  }
`;

export default Modal;
