import styled from "styled-components";
import Button from "./Button";
import axios from "axios";
import { ModalBackground, CloseBtn } from "../components/Reusable";

const ModalWrapper = styled.div`
  width: 700px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  position: relative;
  padding: 15px;
`;

const BookImg = styled.img`
  height: 90%;
  width: 40%;
  box-shadow: 5px 5px 20px 5px #8d8d8d;
  object-fit: cover;
`;

const DescWapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 90%;
  width: 50%;
  padding: 15px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #594d49;
`;

const Writer = styled.div`
  margin-top: 15px;
  font-size: 12px;
`;

const Description = styled.div`
  line-height: 1.5;
  margin-top: 40px;
  font-size: 10px;
`;

const ButtonWrap = styled.div`
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 70px;
  justify-content: space-between;
`;

function BookInfoModal({ setIsNotify, setNotify, bookinfo, setInfoOpen }) {
  const openModalHandler = () => {
    setInfoOpen(false);
  };

  const clickHandler = (e) => {
    if (e.target.textContent === "읽고 있는 책") {
      axios
        .post(
          "http://localhost:4000/mypage/rack",
          {
            ...bookinfo,
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
            ...bookinfo,
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
    <ModalBackground onClick={openModalHandler}>
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseBtn onClick={openModalHandler}>&times;</CloseBtn>
        <BookImg src={bookinfo.coverimg} alt="book_cover" />
        <DescWapper>
          <Title>{bookinfo.title}</Title>
          <Writer>
            {bookinfo.author} | {bookinfo.publisher}
          </Writer>
          <Description>{bookinfo.description}</Description>
          <ButtonWrap onClick={clickHandler}>
            <Button message={"읽고 있는 책"} color={null} />
            <Button message={"다 읽은 책"} color={"dark"} />
          </ButtonWrap>
        </DescWapper>
      </ModalWrapper>
    </ModalBackground>
  );
}
export default BookInfoModal;
