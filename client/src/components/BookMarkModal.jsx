import styled from "styled-components";
import Button from "./Button";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
`;
const ModalWrapper = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  border: 1px solid;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  position: relative;
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
`;
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: space-evenly;
  height: 50%;
`;

function BookMarkModal({ setIsNotify, setNotify, bookinfo, setMarkOpen }) {
  const { title, author, publisher, coverimg, description, isbn13, pages } =
    bookinfo;

  const openModalHandler = () => {
    setMarkOpen(false);
  };
  const clickHandler = (e) => {
    if (e.target.textContent === "읽고 있는 책") {
      axios
        .post(
          "http://localhost:4000/mypage/rack",
          {
            title,
            author,
            publisher,
            coverimg,
            description,
            isbn13,
            pages,
          },
          { withCredentials: true }
        )
        .then(() => {
          setIsNotify(true);
          setNotify("랙에 책이 추가되었습니다.");
        });
      // setIsNotify(true);
      // setNotify("랙에 책이 추가되었습니다.");
    } else if (e.target.textContent === "다 읽은 책") {
      axios
        .post(
          "http://localhost:4000/mypage/shelf",
          {
            title,
            author,
            publisher,
            coverimg,
            description,
            isbn13,
            pages,
          },
          { withCredentials: true }
        )
        .then(() => {
          setIsNotify(true);
          setNotify("책장에 책이 추가되었습니다.");
        });
    }
  };

  return (
    <Wrapper onClick={openModalHandler}>
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseBtn onClick={openModalHandler}>&times;</CloseBtn>
        <ButtonWrap onClick={clickHandler}>
          <Button message={"읽고 있는 책"} color={null} />
          <Button message={"다 읽은 책"} color={"dark"} />
        </ButtonWrap>
      </ModalWrapper>
    </Wrapper>
  );
}
export default BookMarkModal;
