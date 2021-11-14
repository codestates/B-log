import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import welcome from "../assets/images/welcome-page.jpg";
import Qwigley from "../assets/fonts/Qwigley-Regular.woff";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Notification from "../components/Notification";
import Button from "../components/Button";

const LoginSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ImgAndLogin = styled.div`
  height: 700px;
  width: 1000px;
  display: flex;
`;

const Img = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  width: 50%;
  height: 100%;
  > a {
    color: #202123;
    text-decoration: none;
    :hover {
      font-weight: 700;
    }
  }
`;

const LoginLogo = styled.h2`
  @font-face {
    font-family: "Qwigley";
    src: local("Qwigley"), url(${Qwigley}) format("woff");
  }
  font-family: "Qwigley";
  font-size: 80px;
  font-weight: 400;
  margin-bottom: 40px;
  letter-spacing: 2px;
`;

const LoginInput = styled.input`
  margin-bottom: 40px;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  outline: none;
  width: 180px;
  height: 24px;
  background-color: transparent;
`;

const LoginBtn = styled.div`
  margin: 40px 0;
`;

function LogIn({ setIsLogin }) {
  const navigate = useNavigate();
  const regExpEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [isNotify, setIsNotify] = useState(false);
  const [msgState, setMsgState] = useState(0);
  const message = [
    "이메일을 입력해주세요.",
    "비밀번호를 입력해주세요.",
    "올바른 이메일 형식이 아닙니다.",
    "잘못된 아이디 이거나 비밀번호가 틀렸습니다.",
    "네트워크 환경이 불안정 합니다.",
  ];

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const loginHandler = () => {
    if (!loginInfo.email.length) {
      setIsNotify(!isNotify);
      setMsgState(0);
    } else if (!loginInfo.password.length) {
      setIsNotify(!isNotify);
      setMsgState(1);
    } else if (!regExpEmail.test(loginInfo.email)) {
      setIsNotify(!isNotify);
      setMsgState(2);
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          { email: loginInfo.email, password: loginInfo.password },
          { withCredentials: true }
        )
        .then(() => {
          setIsLogin(true);
          navigate("/");
        })
        .catch((err) => {
          if (err.status === 401) {
            setIsNotify(!isNotify);
            setMsgState(3);
          } else {
            setIsNotify(!isNotify);
            setMsgState(4);
          }
        });
    }
  };
  const pressEnter = (e) => {
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  useEffect(() => {
    if (isNotify) {
      setTimeout(() => setIsNotify(!isNotify), 3000);
    }
  }, [isNotify]);
  return (
    <>
      <LoginSection>
        {isNotify ? (
          <Notification
            message={message[msgState]}
            isNotify={isNotify}
            time={3000}
          ></Notification>
        ) : null}
        <ImgAndLogin>
          <Img src={welcome} alt="welcome page" />
          <LoginWrapper>
            <LoginLogo>Login</LoginLogo>
            <div>
              <LoginInput
                type="text"
                placeholder=" 이메일"
                onChange={handleInputValue("email")}
              />
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div>
              <LoginInput
                type="password"
                placeholder=" 비밀번호"
                onChange={handleInputValue("password")}
                onKeyUp={(e) => pressEnter(e)}
              />
              <FontAwesomeIcon icon={faLock} />
            </div>
            <LoginBtn onClick={loginHandler}>
              <Button message={"로그인"} />
            </LoginBtn>
            <a href="/signup">회원가입</a>
          </LoginWrapper>
        </ImgAndLogin>
      </LoginSection>
    </>
  );
}
export default LogIn;
