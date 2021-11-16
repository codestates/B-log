import styled from "styled-components";
import Book from "../components/Book";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RackBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-evenly;
  width: 600px;
  height: 500px;
  margin: 50px 0;
  > .select_icon_box {
    margin-top: 20px;
    display: flex;
    width: 220px;
    justify-content: space-between;
    > select {
      display: inline-block;
      padding: 6px;
      background-color: transparent;
      overflow: hidden;
      text-align: center;
    }
  }
`;

const Row = styled.div`
  width: 90%;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
`;

const BookWrapper = styled.div`
  display: flex;
  width: 100%;
  > div {
    height: 200px;
    margin: 0 23px;
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 15px;
  background-color: #6c5852;
  box-shadow: 2px 2px 5px #8d8d8d;
`;

function Rack({ setBookinfo, setInfoOpen }) {
  const state = useSelector((state) => state.bookReducer);
  const navigate = useNavigate();
  const { rack } = state;

  const infoModalHandler = (book) => {
    setBookinfo(book);
    setInfoOpen(true);
  };

  const selectHandler = (e) => {
    if (e.target.value === "") {
      return;
    }
    const pick = rack.filter((book) => book.title === e.target.value)[0];
    infoModalHandler(pick);
    e.target.selectedIndex = 0;
  };

  return (
    <RackBox>
      <Row>
        <BookWrapper>
          {rack.slice(0, 3).map((book) => (
            <div key={book.id}>
              <Book
                bookinfo={book}
                isMypage={true}
                infoModalHandler={() => infoModalHandler(book)}
              />
            </div>
          ))}
        </BookWrapper>
        <Bar />
      </Row>
      <Row>
        <BookWrapper>
          {rack.slice(3, 6).map((book) => (
            <div key={book.id}>
              <Book
                bookinfo={book}
                isMypage={true}
                infoModalHandler={() => infoModalHandler(book)}
              />
            </div>
          ))}
        </BookWrapper>
        <Bar />
      </Row>
      <div className="select_icon_box">
        <select name="rack" onChange={selectHandler}>
          <option value="">읽고있는 책 목록</option>
          {rack.map((book, idx) => {
            return (
              <option value={book.title} key={idx}>
                {idx + 1}.{" "}
                {book.title.length >= 10
                  ? book.title.slice(0, 10) + "..."
                  : book.title}
              </option>
            );
          })}
        </select>
        <FontAwesomeIcon
          icon={faSearchPlus}
          size="2x"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/search");
          }}
        />
      </div>
    </RackBox>
  );
}

export default Rack;
