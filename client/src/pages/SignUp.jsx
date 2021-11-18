import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { notify } from "../actions/index";
import { useDispatch } from "react-redux";
import axios from "axios";
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

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    check: "",
    username: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    check: false,
  });
  const [message, setMessage] = useState({
    email: "",
    password: "",
    check: "",
  });
  const regExpEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const regExpPwd = /^(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/i;

  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
    if (!signupInfo[key].length) {
      setMessage({ ...message, [key]: "" });
      setIsValid({ ...isValid, [key]: false });
    }
  };

  const checkEmail = () => {
    if (!regExpEmail.test(signupInfo.email) && signupInfo.email.length) {
      setMessage({ ...message, email: "올바른 이메일 형식이 아닙니다." });
      setIsValid({ ...isValid, email: false });
    } else if (regExpEmail.test(signupInfo.email)) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/auth/checkuseremail/${signupInfo.email}`
        )
        .then(() => {
          setMessage({ ...message, email: "" });
          setIsValid({ ...isValid, email: true });
        })
        .catch(() => {
          setMessage({ ...message, email: "중복된 이메일 입니다." });
          setIsValid({ ...isValid, email: false });
        });
    }
  };

  const checkPassword = () => {
    if (!regExpPwd.test(signupInfo.password) && signupInfo.password.length) {
      setMessage({
        ...message,
        password: "8~16자 영문 대 소문자, 숫자를 사용하세요.",
      });
      setIsValid({ ...isValid, password: false });
    } else {
      setMessage({ ...message, password: "" });
      setIsValid({ ...isValid, password: true });
    }
  };

  const checkMatched = () => {
    const { password, check } = signupInfo;
    if (
      (password === check && password.length) ||
      !(password.length && check.length)
    ) {
      setMessage({ ...message, check: "" });
      setIsValid({ ...isValid, check: true });
    } else {
      setMessage({
        ...message,
        check: "비밀번호가 일치하지 않습니다.",
      });
      setIsValid({ ...isValid, check: false });
    }
  };

  const buttonHandler = (e) => {
    const { email, password, check } = isValid;
    const isRequest = e.target.textContent === "회원가입" ? true : false;
    if (isRequest && email && password && check && signupInfo.username.length) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
          email: signupInfo.email,
          username: signupInfo.username,
          password: signupInfo.password,
        })
        .then(() => {
          dispatch(notify("회원가입이 완료되었습니다."));
          navigate("/login");
        });
    } else if (!signupInfo.username.length && isRequest) {
      dispatch(notify("닉네임을 입력해주세요."));
    }
  };

  useEffect(() => {
    checkMatched();
    // eslint-disable-next-line
  }, [signupInfo.password, signupInfo.check]);

  return (
    <>
      <Container>
        <Section>
          <Title>Sign Up</Title>
          <InputContainer>
            <Desc>이메일</Desc>
            <Input
              onChange={handleInputValue("email")}
              onBlur={checkEmail}
            ></Input>
            <ErrorMsg>{message.email}</ErrorMsg>
          </InputContainer>
          <InputContainer>
            <Desc>닉네임</Desc>
            <Input onChange={handleInputValue("username")}></Input>
          </InputContainer>
          <InputContainer>
            <Desc>비밀번호</Desc>
            <Input
              type="password"
              onChange={handleInputValue("password")}
              onBlur={checkPassword}
            ></Input>
            <ErrorMsg>{message.password}</ErrorMsg>
          </InputContainer>
          <InputContainer>
            <Desc>비밀번호 확인</Desc>
            <Input type="password" onChange={handleInputValue("check")}></Input>
            <ErrorMsg>{message.check}</ErrorMsg>
          </InputContainer>
          <ButtonContainer onClick={buttonHandler}>
            <Link to="/login">
              <Button message="돌아가기" color="dark" />
            </Link>
            <Button message="회원가입" />
          </ButtonContainer>
        </Section>
      </Container>
    </>
  );
}
export default SignUp;
