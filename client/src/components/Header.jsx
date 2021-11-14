import { useSelector, useDispatch } from "react-redux";
import { loginStateChange, notify } from "../actions/index";
import styled from "styled-components";
import axios from "axios";

export const HeaderBox = styled.div`
  width: 100vw;
  padding: 10px 0;
  background-color: #e0e0d8;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1000;
`;

export const LogoBox = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  flex: 1 0 auto;
`;

const Logo = styled.a`
  display: inline-block;
  width: 120px;
  height: 100%;
  background-color: #44312b;
  margin-left: 40px;
`;

export const Nav = styled.nav`
  flex: 0 0 auto;
`;

export const Menu = styled.a`
  display: inline-block;
  padding: 10px 20px;
  letter-spacing: 0.1em;

  &:last-child {
    margin: 0px 40px;
  }

  :hover {
    font-weight: 700;
  }
`;

function Header() {
  const state = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const { isLogIn } = state;

  const logoutHandler = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/logout`, null, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(loginStateChange(false));
        dispatch(notify("로그아웃 되었습니다."));
      });
  };

  return (
    <>
      <HeaderBox>
        <LogoBox>
          <Logo href="/" />
        </LogoBox>
        <Nav>
          {isLogIn ? <Menu href="/mypage">내 책장</Menu> : null}
          {isLogIn ? (
            <Menu onClick={logoutHandler}>로그아웃</Menu>
          ) : (
            <Menu href="/login">로그인</Menu>
          )}
        </Nav>
      </HeaderBox>
    </>
  );
}
export default Header;
