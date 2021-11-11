import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const EmailMent = styled.div`
  height: 14px;
  color: ${(props) =>
    [0, 2].includes(props.message.emailMsg) ? "red" : "green"};
`;
const PwdMent = styled.div`
  height: 14px;
  color: ${(props) => ([3].includes(props.message.pwdMsg) ? "red" : "green")};
`;
const PwdCheckMent = styled.div`
  height: 14px;
  color: ${(props) =>
    [5].includes(props.message.pwdCheckMsg) ? "red" : "green"};
`;
const SignUpButton = styled.button`
  :hover {
    cursor: ${(props) => (props.isValid ? "pointer" : "not-allowed")};
  }
`;

function SignUp() {
  const navigate = useNavigate();
  //상태
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    username: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState({
    emailMsg: 0,
    pwdMsg: 3,
    pwdCheckMsg: 5,
  });
  const [isFirstTime, setIsFirstTime] = useState({
    id: true,
    pwd: true,
    pwdC: true,
  });
  const ment = [
    "올바른 이메일이 아닙니다.",
    "멋진 아이디네요! :)",
    "중복된 아이디 입니다.",
    "8~16자 영문 대 소문자, 숫자를 사용하세요.",
    "사용 가능한 비밀번호 입니다!",
    "비밀번호가 일치하지 않습니다.",
    "비밀번호가 일치합니다.",
  ];
  const regExpId =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const regExpPwd = /^(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;

  //함수
  const handleInputValue = (key) => (e) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };
  const idCheck = () => {
    if (signupInfo.email.length) {
      setIsFirstTime({ ...isFirstTime, id: false });
    } else {
      setIsFirstTime({ ...isFirstTime, id: true });
    }

    if (!regExpId.test(signupInfo.email)) {
      setMessage({ ...message, emailMsg: 0 });
    } else {
      axios
        .post("http://localhost:4000/auth/checkuseremail", {
          email: signupInfo.email,
        })
        .then((res) => {
          if (res.data) {
            setMessage({ ...message, emailMsg: 1 });
            setIsValid({ ...isValid, id: true });
          } else {
            setMessage({ ...message, emailMsg: 2 });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setMessage({ ...message, emailMsg: 1 });
      setIsValid({ ...isValid, id: true });
    }
  };
  const pwdCheck = () => {
    if (signupInfo.password.length) {
      setIsFirstTime({ ...isFirstTime, pwd: false });
    } else {
      setIsFirstTime({ ...isFirstTime, pwd: true });
    }
    if (regExpPwd.test(signupInfo.password)) {
      setMessage({ ...message, pwdMsg: 4 });
    } else {
      setMessage({ ...message, pwdMsg: 3 });
    }
  };
  const signUpHandler = () => {
    if (isValid) {
      axios
        .post("http://localhost:4000/auth/signup", {
          email: signupInfo.email,
          username: signupInfo.username,
          password: signupInfo.password,
        })
        .then(() => {
          navigate("/login");
        });
    }
  };
  const backHandler = () => {
    window.history.back();
  };
  useEffect(() => {
    if (
      signupInfo.passwordCheck.length >= signupInfo.password.length &&
      signupInfo.passwordCheck.length
    ) {
      setIsFirstTime({ ...isFirstTime, pwdC: false });
    }

    if (signupInfo.password === signupInfo.passwordCheck) {
      setMessage({ ...message, pwdCheckMsg: 6 });
    } else {
      setMessage({ ...message, pwdCheckMsg: 5 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupInfo]);
  const usernameHandler = (e) => {
    setSignupInfo({ ...signupInfo, username: e.target.value });
  };

  useEffect(() => {
    if (
      message.emailMsg === 1 &&
      message.pwdMsg === 4 &&
      message.pwdCheckMsg === 6 &&
      signupInfo.username
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <>
      <h2>Sign Up</h2>
      <div className="id">
        <div>이메일</div>
        <input
          type="text"
          onChange={handleInputValue("email")}
          onBlur={idCheck}
          placeholder="이메일을 입력해주세요."
        ></input>
      </div>
      {!isFirstTime.id ? (
        <EmailMent message={message}>{ment[message.emailMsg]}</EmailMent>
      ) : (
        <EmailMent message={message}></EmailMent>
      )}
      <div className="nickname">
        <div>닉네임</div>
        <input
          type="text"
          onChange={usernameHandler}
          placeholder="닉네임이 필요합니다."
        ></input>
      </div>
      <div className="password">
        <div>비밀번호</div>
        <input
          type="password"
          onChange={handleInputValue("password")}
          onBlur={pwdCheck}
          placeholder="비밀번호를 입력해주세요."
        ></input>
      </div>
      {!isFirstTime.pwd ? (
        <PwdMent message={message}>{ment[message.pwdMsg]}</PwdMent>
      ) : (
        <PwdMent message={message}></PwdMent>
      )}
      <div className="password-check">
        <div>비밀번호 확인</div>
        <input
          type="password"
          onChange={handleInputValue("passwordCheck")}
        ></input>
      </div>
      {!isFirstTime.pwdC ? (
        <PwdCheckMent message={message}>
          {ment[message.pwdCheckMsg]}
        </PwdCheckMent>
      ) : (
        <PwdCheckMent message={message}></PwdCheckMent>
      )}
      <button onClick={backHandler}>뒤로가기</button>
      <SignUpButton onClick={signUpHandler} isValid={isValid}>
        회원가입
      </SignUpButton>
    </>
  );
}
export default SignUp;
