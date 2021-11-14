import { notify, removeRackBook } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { ModalBackground, CloseBtn } from "../components/Reusable";
import styled from "styled-components";
import Button from "./Button";
import axios from "axios";

const ModalWrapper = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  position: relative;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: space-evenly;
  height: 50%;
`;

function BookMarkModal({ bookinfo, setMarkOpen }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.bookReducer);
  const { rack } = state;

  const closeModalHandler = () => {
    setMarkOpen(false);
  };

  const clickHandler = (e) => {
    if (e.target.textContent === "읽고 있는 책") {
      axios
        .post(
          `${process.env_REACT_APP_API_URL}/mypage/rack`,
          {
            ...bookinfo,
          },
          { withCredentials: true }
        )
        .then(() => {
          closeModalHandler();
          dispatch(notify("읽고 있는 책이 추가되었습니다."));
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(notify("로그인이 필요합니다."));
          } else if (err.response.status === 409) {
            dispatch(notify("이미 읽고있는 책입니다."));
          }
        });
    } else if (e.target.textContent === "다 읽은 책") {
      const isbns = rack.map((book) => book.isbn13);
      if (!isbns.includes(bookinfo.isbn13)) {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/mypage/shelf`,
            {
              ...bookinfo,
            },
            { withCredentials: true }
          )
          .then(() => {
            closeModalHandler();
            dispatch(notify("책장에 책이 추가되었습니다."));
          })
          .catch((err) => {
            if (err.response.status === 401) {
              dispatch(notify("로그인이 필요합니다."));
            } else if (err.response.status === 409) {
              dispatch(notify("이미 책장에 있는 책입니다."));
            }
          });
      } else {
        const exist = rack.filter((book) => book.isbn13 === bookinfo.isbn13)[0];
        axios
          .delete(`${process.env.REACT_APP_API_URL}/mypage/rack/${exist.id}`, {
            withCredentials: true,
          })
          .then(() => {
            dispatch(removeRackBook(exist.id));
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/mypage/shelf`,
                {
                  ...bookinfo,
                },
                { withCredentials: true }
              )
              .then(() => {
                closeModalHandler();
                dispatch(notify("책장에 책이 추가되었습니다."));
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  dispatch(notify("로그인이 필요합니다."));
                } else if (err.response.status === 409) {
                  dispatch(notify("이미 책장에 있는 책입니다."));
                }
              });
          });
      }
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
        <ButtonWrap onClick={clickHandler}>
          <Button message="읽고 있는 책" />
          <Button message="다 읽은 책" color="dark" />
        </ButtonWrap>
      </ModalWrapper>
    </ModalBackground>
  );
}
export default BookMarkModal;
