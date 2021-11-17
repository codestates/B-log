import {
  notify,
  addToRack,
  addToShelf,
  removeFromRack,
} from "../actions/index";
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
  const { rack, shelf } = state;

  const closeModalHandler = () => {
    setMarkOpen(false);
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
                dispatch(
                  notify("읽고 있는 책이 추가되었습니다.", "내 책장으로 가기")
                );
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  dispatch(
                    notify("로그인이 필요합니다.", "로그인 페이지로 가기")
                  );
                }
                if (err.response.status === 409) {
                  dispatch(
                    notify("이미 읽고있는 책입니다.", "내 책장으로 가기")
                  );
                }
              });
          });
        //책장에 책이 있는 경우
      } else {
        closeModalHandler();
        dispatch(notify("이미 다 읽은 책 입니다.", "내 책장으로 가기"));
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
                dispatch(
                  notify("책장에 책이 추가되었습니다.", "내 책장으로 가기")
                );
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  dispatch(
                    notify("로그인이 필요합니다.", "로그인 페이지로 가기")
                  );
                } else if (err.response.status === 409) {
                  closeModalHandler();
                  dispatch(
                    notify("이미 책장에 있는 책입니다.", "내 책장으로 가기")
                  );
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
                dispatch(
                  notify("책장에 책이 추가되었습니다.", "내 책장으로 가기")
                );
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  dispatch(
                    notify("로그인이 필요합니다.", "로그인 페이지로 가기")
                  );
                } else if (err.response.status === 409) {
                  closeModalHandler();
                  dispatch(
                    notify("이미 책장에 있는 책입니다.", "내 책장으로 가기")
                  );
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
