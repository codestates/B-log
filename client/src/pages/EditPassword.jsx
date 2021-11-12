import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Notification from "../components/Notification";
import Button from "../components/Button";
import {
  Container,
  Section,
  Title,
  InputContainer,
  Desc,
  Input,
  ErrorMsg,
  ButtonContainer,
} from "../components/Reusable";

function EditPassword() {
  const currentPwInput = useRef(null);
  const newPwInput = useRef(null);
  const [password, setPassword] = useState({
    current: "",
    fresh: "",
    check: "",
  });
  const [errorMessage, setErrorMessage] = useState({ fresh: "", check: "" });
  const [requestError, setRequestError] = useState("");
  const [isValid, setIsValid] = useState({ fresh: false, check: false });
  // const [isFirstTime, setIsFirstTime] = useState({fresh: true, check: false})
  const [isNotify, setIsNotify] = useState(false);

  const navigate = useNavigate();
  const regExpPwd = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const getPassword = (key) => (e) => {
    setPassword({ ...password, [key]: e.target.value });
  };

  const checkValidation = () => {
    if (regExpPwd.test(password.fresh) || !password.fresh.length) {
      setErrorMessage({ ...errorMessage, fresh: "" });
      setIsValid({ ...isValid, fresh: true });
    } else {
      setErrorMessage({
        ...errorMessage,
        fresh: "8~16자 영문 대 소문자, 숫자를 사용하세요.",
      });
      setIsValid({ ...isValid, fresh: false });
    }
  };

  const checkMatched = () => {
    const { fresh, check } = password;
    if ((fresh === check && fresh.length) || !(fresh.length && check.length)) {
      setErrorMessage({ ...errorMessage, check: "" });
      setIsValid({ ...isValid, check: true });
    } else {
      setErrorMessage({
        ...errorMessage,
        check: "비밀번호가 일치하지 않습니다.",
      });
      setIsValid({ ...isValid, check: false });
    }
  };

  const onKeyUpHandler = (event) => {
    if (event.key === "Enter") {
      sendRequest();
    }
  };

  const sendRequest = (event) => {
    const isRequest =
      event.target.textContent === "회원정보 수정" ? true : false;
    if (isRequest && isValid.fresh && isValid.check) {
      axios
        .patch("/users/password", {
          current_password: password.current,
          new_password: password.fresh,
        })
        .then((res) => navigate("/mypage"))
        .catch((err) => {
          setRequestError("현재 비밀번호가 일치하지 않습니다.");
          setIsNotify(true);
        });
    } else {
      setRequestError("새 비밀번호를 바르게 입력해주세요.");
      setIsNotify(true);
    }
  };

  useEffect(() => {
    checkMatched();
    // eslint-disable-next-line
  }, [password.check]);

  useEffect(() => {
    if (isNotify) {
      if (requestError === "현재 비밀번호가 일치하지 않습니다.") {
        currentPwInput.current.focus();
      } else if (requestError === "새 비밀번호를 바르게 입력해주세요.") {
        newPwInput.current.focus();
      }
      setTimeout(() => setIsNotify(false), 3000);
    }
  }, [isNotify, requestError]);

  return (
    <>
      <Container>
        {isNotify ? <Notification message={requestError} time={3000} /> : null}
        <Section>
          <Title>Password</Title>
          <InputContainer>
            <Desc>현재 비밀번호</Desc>
            <Input
              type="password"
              onChange={getPassword("current")}
              ref={currentPwInput}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Desc>새 비밀번호</Desc>
            <Input
              type="password"
              onChange={getPassword("fresh")}
              onBlur={checkValidation}
              ref={newPwInput}
            ></Input>
            <ErrorMsg>{errorMessage.fresh}</ErrorMsg>
          </InputContainer>
          <InputContainer>
            <Desc>새 비밀번호 확인</Desc>
            <Input
              type="password"
              onChange={getPassword("check")}
              onKeyUp={onKeyUpHandler}
            ></Input>
            <ErrorMsg>{errorMessage.check}</ErrorMsg>
          </InputContainer>
          <ButtonContainer onClick={sendRequest}>
            <Link to="/mypage">
              <Button message={"돌아가기"} color={"dark"} />
            </Link>
            <Button message={"회원정보 수정"} color={"light"}>
              회원정보 수정
            </Button>
          </ButtonContainer>
        </Section>
      </Container>
    </>
  );
}

export default EditPassword;
