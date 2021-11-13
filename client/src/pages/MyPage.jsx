import styled from "styled-components";
import Button from "../components/Button";
import Books from "../components/Books";
import books from "../assets/dummy/books";

const WindowSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`;

const RackSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 100%;
  position: relative;
  margin-right: 100px;
`;

const SpanBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 300px;
  height: 70px;
  margin-top: 40px;
`;

const UserNameSpan = styled.span`
  font-size: 32px;
  font-weight: 700;
  padding-right: 5px;
  line-height: 1.5;
`;

const Rack = styled.section`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-evenly;
  width: 600px;
  height: 500px;
  margin: 50px 0;
`;

const Row = styled.div`
  width: 90%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
`;
const Book = styled.ul`
  height: 170px;
`;
const Bar = styled.div`
  width: 100%;
  height: 15px;
  background-color: #594d49;
`;

const ButtonBox = styled.div`
  width: 450px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Shelf = styled.section`
  flex: 1;
  display: flex;
  height: 100%;
`;

function MyPage({ setIsNotify, setNotify, myBooks }) {
  return (
    <WindowSection>
      <RackSection>
        <SpanBox>
          <div>
            <UserNameSpan>닉네임</UserNameSpan> {/*username*/}
            <span>님</span>
          </div>
          <span>오늘도 책 속의 새로운 세계로 여행을 떠나보세요</span>
        </SpanBox>
        <Rack>
          <Row>
            <Books row={1} col={3} books={books} myBooks={myBooks} />
            <Bar />
          </Row>
          <Row>
            <Books row={1} col={3} books={books} myBooks={myBooks} />
            <Bar />
          </Row>
        </Rack>
        <ButtonBox>
          <Button message="닉네임 변경" />
          <Button message="비밀번호 변경" />
          <Button message="회원 탈퇴하기" />
        </ButtonBox>
      </RackSection>
      <Shelf></Shelf>
    </WindowSection>
  );
}
export default MyPage;
