import styled from "styled-components";
import team_logo from "../assets/images/team_logo.svg";
import { LogoBox, Nav } from "./Header";

const FooterBox = styled.div`
  @media screen and (max-width: 760px) {
    display: none;
  }
  width: 100vw;
  padding: 10px 0;
  display: flex;
  align-items: center;
  position: relative;
  padding: 20px 0;
  background: rgb(214, 170, 125, 0.3);
`;

const TeamLogo = styled.img`
  width: 120px;
  margin-left: 40px;
`;

const Member = styled.a`
  display: inline-block;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 10px 30px;

  &:last-child {
    padding-right: 20px;
    margin: 0 40px 0 0;
  }

  :hover {
    font-weight: 700;
  }
`;

function Footer() {
  return (
    <FooterBox>
      <LogoBox>
        <TeamLogo src={team_logo} />
      </LogoBox>
      <Nav>
        <Member href="https://github.com/Deb-neal" target="_blank">
          안민수
        </Member>
        <Member href="https://github.com/Gyosic" target="_blank">
          황교식
        </Member>
        <Member href="https://github.com/soominna" target="_blank">
          나수민
        </Member>
        <Member href="https://github.com/yeinMOON" target="_blank">
          문예인
        </Member>
      </Nav>
    </FooterBox>
  );
}

export default Footer;
