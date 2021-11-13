import styled from "styled-components";
import Button from "./Button";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

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

const CloseBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
  font-size: 26px;
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
  const { title, author, publisher, coverimg, description, isbn13, pages } =
    bookinfo;

  const openModalHandler = () => {
    setInfoOpen(false);
  };

  const clickHandler = (e) => {
    if (e.target.textContent === "읽고 있는 책") {
      axios
        .post(
          `${process.env_REACT_APP_API_URL}/mypage/rack`,
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
          setNotify("읽고 있는 책이 추가되었습니다.");
        });
      // setIsNotify(true);
      // setNotify("랙에 책이 추가되었습니다.");
    } else if (e.target.textContent === "다 읽은 책") {
      axios
        .post(
          `${process.env_REACT_APP_API_URL}/mypage/shelf`,
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
        <BookImg src={coverimg} alt="book_cover" />
        <DescWapper>
          <Title>{title}</Title>
          <Writer>
            {author} | {publisher}
          </Writer>
          <Description>{description}</Description>
          <ButtonWrap onClick={clickHandler}>
            <Button message={"읽고 있는 책"} color={null} />
            <Button message={"다 읽은 책"} color={"dark"} />
          </ButtonWrap>
        </DescWapper>
      </ModalWrapper>
    </Wrapper>
  );
}
export default BookInfoModal;
