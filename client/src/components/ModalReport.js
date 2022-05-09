import styled from "styled-components";
import Loading from "./Loading";

const ModalReport = ({
  show,
  close,
  reportLoading,
  handleReport,
  reportSuccess,
  reportError,
}) => {
  if (!show) return null;

  let value;
  return (
    <Container onClick={close}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Close>
          <span onClick={close}>X</span>
        </Close>
        {reportSuccess && (
          <p style={{ textAlign: "center" }}>Thank you for your feedback</p>
        )}
        {reportError && (
          <p style={{ textAlign: "center", color: "red" }}>Error</p>
        )}
        <Title>Why are you reporting this Letter?</Title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label>
            <ReportOption
              type='radio'
              name='report'
              value='harmful'
              onChange={(e) => (value = e.target.value)}
              defaultChecked
            />{" "}
            Harmful
          </label>
          <label>
            <ReportOption
              type='radio'
              name='report'
              value='hate speech'
              onChange={(e) => (value = e.target.value)}
            />{" "}
            Contain hate speech
          </label>
          <label>
            <ReportOption
              type='radio'
              name='report'
              value='spam'
              onChange={(e) => (value = e.target.value)}
            />{" "}
            It's spam or scam
          </label>
          <label>
            <ReportOption
              type='radio'
              name='report'
              value='false information'
              onChange={(e) => (value = e.target.value)}
            />{" "}
            False information
          </label>
          <label>
            <ReportOption
              type='radio'
              name='report'
              value='other'
              onChange={(e) => (value = e.target.value)}
            />{" "}
            Other
          </label>
        </div>
        <ButtonWrapper>
          <Button
            disabled={reportLoading}
            onClick={() => handleReport(value || "harmful")}
          >
            {reportLoading ? <Loading /> : "REPORT"}
          </Button>
          <Button onClick={close} disabled={reportLoading}>
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
  width: 50%;
  min-height: 300px;
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

const Title = styled.h3`
  text-align: center;
  margin-bottom: 15px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
`;

const ReportOption = styled.input`
  margin-top: 5px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  margin-top: 20px;
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

export default ModalReport;
