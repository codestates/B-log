import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
import axios from "axios";

function EditPassword() {
  const [password, setPassword] = useState({
    current: "",
    fresh: "",
    check: "",
  });
  const [errorMessage, setErrorMessage] = useState({ fresh: "", check: "" });
  const [isValid, setIsValid] = useState({ fresh: false, check: false });

  const navigate = useNavigate();
  const regExpPwd = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  const getPassword = (key) => (e) => {
    setPassword({ ...password, [key]: e.target.value });
  };

  const checkValidation = () => {
    if (regExpPwd.test(password.fresh)) {
      setErrorMessage({ ...errorMessage, fresh: "" });
      setIsValid({ ...isValid, fresh: true });
    } else {
      setErrorMessage(
        Object.assign({}, errorMessage, {
          fresh: "8~16자 영문 대 소문자, 숫자를 사용하세요.",
        })
      );
      setIsValid(Object.assign({}, isValid, { fresh: false }));
    }
  };

  const checkMatched = () => {
    const { fresh, check } = password;
    if (fresh === check) {
      setErrorMessage({ ...errorMessage, check: "" });
      setIsValid({ ...isValid, check: true });
    } else {
      setErrorMessage(
        Object.assign({}, errorMessage, {
          check: "비밀번호가 일치하지 않습니다.",
        })
      );
      setIsValid(Object.assign({}, isValid, { check: false }));
    }
  };

  const onKeyUpHandler = (event) => {
    if (event.key === "Enter") {
      sendRequest();
    }
  };

  const sendRequest = () => {
    // valid하지 않다면 요청을 보내지 않아야 한다.
    if (isValid.fresh && isValid.check) {
      axios
        .patch("/users/password", {
          current_password: password.current,
          new_password: password.fresh,
        })
        .then((res) => navigate("/mypage"))
        .catch((err) => {}); // notification 현재 비밀번호가 일치하지 않습니다.
    } else {
      // notification 새 비밀번호를 바르게 입력해주세요.
    }
  };

  useEffect(() => {
    checkMatched();
  }, [password.check]);

  return (
    <div>
      <h2>Password</h2>
      <div>
        <span>현재 비밀번호</span>
        <input type="password" onChange={getPassword("current")}></input>
      </div>
      <div>
        <span>새 비밀번호</span>
        <input
          type="password"
          onChange={getPassword("fresh")}
          onBlur={checkValidation}
        ></input>
        <span>{errorMessage.fresh}</span>
      </div>
      <div>
        <span>새 비밀번호 확인</span>
        <input
          type="password"
          onChange={getPassword("check")}
          onKeyUp={onKeyUpHandler}
        ></input>
        <span>{errorMessage.check}</span>
      </div>
      <Link to="/mypage">
        <button>돌아가기</button>
      </Link>
      <button onClick={sendRequest}>회원정보 수정</button>
    </div>
  );
}

export default EditPassword;
