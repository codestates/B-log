import styled from "styled-components";
import { useSelector } from "react-redux";

const ShelfBox = styled.section`
  width: 80%;
  min-width: 600px;
  max-width: 600px;
  height: 705px;
  margin-top: 40px;
  position: relative;
  background-color: #a69883;
`;

const FrameH = styled.div`
  width: calc(100% - 30px);
  margin-left: 15px;
  height: 15px;
  background-color: #ffefe0;
  z-index: 50;
  :first-child {
    height: 21px;
    margin-bottom: -6px;
    border-bottom: 6px solid rgb(0, 0, 0, 0.1);
  }
`;

const FrameVBox = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  justify-content: space-between;
`;

const FrameV = styled.div`
  width: 15px;
  margin-top: -15px;
  height: calc(100% + 30px);
  background-color: #ffefe0;
  z-index: 100;
`;

const FrameInnerH1 = styled.div`
  position: absolute;
  top: 172.5px;
  left: 15px;
  padding: 7.5px;
  width: calc(100% - 30px);
  background-color: #ffefe0;
  border-bottom: 6px solid rgb(0, 0, 0, 0.1);
`;

const FrameInnerH2 = styled(FrameInnerH1)`
  top: 345px;
`;

const FrameInnerH3 = styled(FrameInnerH1)`
  top: 517.5px;
`;

const InnerFrame = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  display: flex;
  align-content: start;
  flex-wrap: wrap;
  /* box-shadow: inset 3px 3px black; */
  /* border: 3px solid black; */
`;

const ShelfBook = styled.div`
  /* height: 157.5px; */
  height: 140px;
  width: ${(props) => (props.page <= 300 ? "30px" : `${props.page * 0.1}px`)};
  margin: 17.5px 2px 15px 1px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: inset -3px -3px 1px grey;
  :nth-child(8n) {
    transform-origin: 13px 0;
    transform: rotate(-3deg);
    margin-right: ${(props) => (props.idx === 7 ? "0px" : "16px")};
  }
  :nth-child(9n) {
    transform-origin: 13px 0;
    transform: rotate(-5deg);
    margin-right: 26px;
    margin-left: ${(props) => (props.idx === 8 ? "2px" : "0")};
  }
  :hover {
    border: 2px solid #f5f5f5;
    box-shadow: none;
  }
  > span {
    display: inline-block;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    padding: 20px 0;
    font-size: 8px;
    color: #525151;
    text-shadow: 0.5px 1px #f5f5f5;
  }
`;

function Shelf({ setReviewOpen, setBookinfo }) {
  const state = useSelector((state) => state.bookReducer);
  const { shelf } = state;

  const randomColor = () => {
    const color = ["#f4f4f4", "#cccbc6", "#efd9c1", "#c7d8c6", "#a9b7c0"];
    const randomIndex = Math.floor(Math.random() * 5);
    return color[randomIndex];
  };

  const reviewHandler = (book) => {
    setBookinfo(book);
    setReviewOpen(true);
  };

  return (
    <ShelfBox>
      <FrameH />
      <FrameVBox>
        <FrameV />
        <FrameV />
      </FrameVBox>
      <FrameH />
      <FrameInnerH1 />
      <FrameInnerH2 />
      <FrameInnerH3 />
      <InnerFrame>
        {shelf.map((book, idx) => (
          <ShelfBook
            key={idx}
            page={book.pages}
            color={randomColor()}
            onClick={() => reviewHandler(book)}
            idx={idx}
          >
            <span>
              {book.title.length >= 16
                ? book.title.slice(0, 16) + "..."
                : book.title}
            </span>
          </ShelfBook>
        ))}
      </InnerFrame>
    </ShelfBox>
  );
}

export default Shelf;
