import styled from "styled-components";
import left from "../assets/images/left.svg";
import right from "../assets/images/right.svg";

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
  background-color: #debea0;
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
  background-color: #debea0;
  z-index: 100;
`;

const FrameInnerH1 = styled.div`
  position: absolute;
  top: 172.5px;
  left: 15px;
  padding: 7.5px;
  width: calc(100% - 30px);
  background-color: #debea0;
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
`;

const ShelfBook = styled.div.attrs((props) => ({
  style: {
    background: props.background,
  },
}))`
  height: 140px;
  width: ${(props) =>
    props.page >= 700
      ? "70px"
      : props.page <= 150
      ? "25px"
      : `${25 + (props.page - 150) * 0.082}px`};
  margin: 17.5px 2px 15px 1px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: inset -3px -3px 3px #4a4a4a;
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
    box-shadow: 0px 0px 7px #4a4a4a;
  }
  > span {
    display: inline-block;
    writing-mode: vertical-lr;
    text-orientation: mixed;
    padding: 20px 2px 20px 0px;
    font-size: 8px;
    color: #f5f5f5;
  }
`;

const PageIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  > div {
    margin: 10px;
    cursor: pointer;
  }
  > span {
    padding: 15px;
    margin-bottom: 2.4px;
  }
`;

function Shelf({
  setReviewOpen,
  setBookinfo,
  shelf,
  pagePlusHandler,
  pageMinusHandler,
  num,
}) {
  const color = [
    "#e76438",
    "#4f8f91",
    "#e48365",
    "#2c5854",
    "#eebb3a",
    "#3a506b",
  ];

  const reviewHandler = (book) => {
    setBookinfo(book);
    setReviewOpen(true);
  };

  return (
    <>
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
              color={color[idx % 6]}
              onClick={() => reviewHandler(book)}
              idx={idx}
            >
              <span>
                {book.title.length >= 16
                  ? book.title.slice(0, 16) + " ..."
                  : book.title}
              </span>
            </ShelfBook>
          ))}
        </InnerFrame>
      </ShelfBox>
      <PageIcon>
        <div onClick={() => pageMinusHandler()}>
          <img
            src={left}
            alt="left"
            style={{ width: "17.5px", cursor: "pointer" }}
          ></img>
        </div>
        <span>{num + 1}</span>
        <div onClick={() => pagePlusHandler()}>
          <img
            src={right}
            alt="right"
            style={{ width: "17.5px", cursor: "pointer" }}
          ></img>
        </div>
      </PageIcon>
    </>
  );
}

export default Shelf;
