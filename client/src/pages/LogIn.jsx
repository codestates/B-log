import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify, loginStateChange } from "../actions/index";
import { useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import welcome from "../assets/images/welcome-page.jpg";
import Qwigley from "../assets/fonts/Qwigley-Regular.woff";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  .input_container {
    position: relative;
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
  height: 36px;
  background-color: transparent;
  :focus {
    background-color: transparent;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
  top: 10px;
`;

const LoginBtn = styled.div`
  margin: 40px 0;
`;

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regExpEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const loginHandler = () => {
    if (!loginInfo.email.length) {
      dispatch(notify("이메일을 입력해주세요."));
    } else if (!loginInfo.password.length) {
      dispatch(notify("비밀번호를 입력해주세요."));
    } else if (!regExpEmail.test(loginInfo.email)) {
      dispatch(notify("올바른 이메일 형식이 아닙니다."));
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/auth/login`,
          { email: loginInfo.email, password: loginInfo.password },
          { withCredentials: true }
        )
        .then(() => {
          dispatch(loginStateChange(true));
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(notify("잘못된 아이디 이거나 비밀번호가 틀렸습니다."));
          } else {
            dispatch(notify("새로고침 후 다시 시도해주세요."));
          }
        });
    }
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  return (
    <LoginSection>
      <ImgAndLogin>
        <Img src={welcome} alt="welcome page" />
        <LoginWrapper>
          <LoginLogo>Login</LoginLogo>
          <div className="input_container">
            <LoginInput
              type="text"
              placeholder=" 이메일"
              onChange={handleInputValue("email")}
            />
            <Icon icon={faUser} />
          </div>
          <div className="input_container">
            <LoginInput
              type="password"
              placeholder=" 비밀번호"
              onChange={handleInputValue("password")}
              onKeyUp={(e) => pressEnter(e)}
            />
            <Icon icon={faLock} />
          </div>
          <LoginBtn onClick={loginHandler}>
            <Button message={"로그인"} />
          </LoginBtn>
          <a href="/signup">회원가입</a>
        </LoginWrapper>
      </ImgAndLogin>
    </LoginSection>
  );
}
export default LogIn;
