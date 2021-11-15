import styled from "styled-components";
import Button from "./Button";
import axios from "axios";
import { ModalBackground, CloseBtn } from "../components/Reusable";
import {
  notify,
  addToRack,
  addToShelf,
  removeFromRack,
} from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

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

function BookInfoModal({ bookinfo, setInfoOpen, isMypage }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.bookReducer);
  const { rack, shelf } = state;

  const closeModalHandler = () => {
    setInfoOpen(false);
  };

  const clickHandler = (e) => {
    if (e.target.textContent === "읽고 있는 책") {
      const isbns = shelf.map((book) => book.isbn13);
      //책장에 책이 없는 경우
      if (!isbns.includes(bookinfo.isbn13)) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/books/item/${bookinfo.isbn13}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/mypage/rack`,
                {
                  ...res.data,
                },
                { withCredentials: true }
              )
              .then((res) => {
                dispatch(addToRack(res.data.book));
                closeModalHandler();
                dispatch(notify("읽고 있는 책이 추가되었습니다."));
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  dispatch(notify("로그인이 필요합니다."));
                }
                if (err.response.status === 409) {
                  dispatch(notify("이미 읽고있는 책입니다."));
                }
              });
          });
        //책장에 책이 있는 경우
      } else {
        closeModalHandler();
        dispatch(notify("이미 다 읽은 책 입니다."));
      }
    } else if (e.target.textContent === "다 읽은 책") {
      const isbns = rack.map((book) => book.isbn13);
      if (!isbns.includes(bookinfo.isbn13)) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/books/item/${bookinfo.isbn13}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/mypage/shelf`,
                {
                  ...res.data,
                },
                { withCredentials: true }
              )
              .then((res) => {
                closeModalHandler();
                dispatch(addToShelf(res.data.book));
                dispatch(notify("책장에 책이 추가되었습니다."));
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  dispatch(notify("로그인이 필요합니다."));
                } else if (err.response.status === 409) {
                  closeModalHandler();
                  dispatch(notify("이미 책장에 있는 책입니다."));
                }
              });
          });
      } else {
        const exist = rack.filter((book) => book.isbn13 === bookinfo.isbn13)[0];
        console.log(exist);
        axios
          .delete(`${process.env.REACT_APP_API_URL}/mypage/rack/${exist.id}`, {
            withCredentials: true,
          })
          .then(() => {
            dispatch(removeFromRack(exist.id));
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/mypage/shelf`,
                {
                  ...exist,
                },
                { withCredentials: true }
              )
              .then((res) => {
                closeModalHandler();
                dispatch(addToShelf(res.data.book));
                dispatch(notify("책장에 책이 추가되었습니다."));
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  dispatch(notify("로그인이 필요합니다."));
                } else if (err.response.status === 409) {
                  closeModalHandler();
                  dispatch(notify("이미 책장에 있는 책입니다."));
                }
              });
          });
      }
    } else if (e.target.textContent === "삭제") {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/mypage/rack/${bookinfo.id}`, {
          withCredentials: true,
        })
        .then(() => {
          dispatch(removeFromRack(bookinfo.id));
          closeModalHandler();
          dispatch(notify("삭제 되었습니다."));
        })
        .catch((err) => {
          if (err.response.status === 401)
            dispatch(notify("로그인이 필요합니다."));
          if (err.response.status === 410)
            dispatch(notify("이미 삭제된 책입니다."));
        });
    }
  };

  return (
    <ModalBackground onClick={closeModalHandler}>
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseBtn onClick={closeModalHandler}>&times;</CloseBtn>
        <BookImg src={bookinfo.coverimg} alt="book_cover" />
        <DescWapper>
          <Title>{bookinfo.title}</Title>
          <Writer>
            {bookinfo.author} | {bookinfo.publisher}
          </Writer>
          <Description>{bookinfo.description}</Description>
          <ButtonWrap onClick={clickHandler}>
            <Button message={isMypage ? "삭제" : "읽고 있는 책"} color={null} />
            <Button message={"다 읽은 책"} color={"dark"} />
          </ButtonWrap>
        </DescWapper>
      </ModalWrapper>
    </ModalBackground>
  );
}
export default BookInfoModal;
