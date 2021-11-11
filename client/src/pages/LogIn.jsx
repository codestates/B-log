import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";

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
          "http://localhost:4000/auth/login",
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
      {isNotify ? (
        <Notification
          message={message[msgState]}
          isNotify={isNotify}
          time={3000}
        ></Notification>
      ) : null}
      <div>Login</div>
      <div className="login_id">
        <div>이메일</div>
        <input
          type="text"
          placeholder="이메일을 입력해주세요."
          onChange={handleInputValue("email")}
        ></input>
      </div>
      <div className="login_password">
        <div>비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleInputValue("password")}
          onKeyUp={(e) => pressEnter(e)}
        ></input>
      </div>
      <button onClick={loginHandler}>로그인</button>
      <div>
        <a href="/signup">회원가입</a>
      </div>
    </>
  );
}
export default LogIn;
