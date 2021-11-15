import styled from "styled-components";
import team_logo from "../assets/images/team_logo.png";
import { HeaderBox, LogoBox, Nav, Menu } from "./Header";

const FooterBox = styled(HeaderBox)`
  padding: 20px 0;
`;

const TeamLogo = styled.img`
  width: 120px;
  margin-left: 40px;
`;

const Member = styled(Menu)`
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
