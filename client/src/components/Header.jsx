import styled from "styled-components";

export const HeaderBox = styled.div`
  width: 100vw;
  padding: 10px 0;
  background-color: #e0e0d8;
  display: flex;
  align-items: center;
  position: relative;
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
  text-decoration: none;
  padding: 10px 20px;

  &:last-child {
    margin: 0px 40px;
  }
`;

function Header({ isLogin, setIsLogin }) {
  const logoutHandler = () => {
    setIsLogin(false);
  };

  return (
    <>
      <HeaderBox>
        <LogoBox>
          <Logo href="/" />
        </LogoBox>
        <Nav>
          {isLogin ? <Menu href="/mypage">내 책장</Menu> : null}
          {isLogin ? (
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
