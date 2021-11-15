import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.li`
  list-style: none;
  position: relative;
  cursor: pointer;
`;

const BookCover = styled.img`
  height: 180px;
  width: 120px;
  object-fit: cover;
  box-shadow: 0px 0px 10px rgba(141, 141, 141, 0.6);
`;

const Bookmark = styled(FontAwesomeIcon)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  color: ${(props) => (props.marked ? "orange" : "white")};

  :hover {
    filter: drop-shadow(1px 1px 4px black);
  }
`;

const HoverContainer = styled.div`
  height: 180px;
  width: 120px;
  position: absolute;
  top: 0;
  opacity: 0;
  padding: 8px;

  :hover {
    opacity: 1;
    background-color: rgba(100, 100, 100, 0.8);
  }
`;

const Title = styled.span`
  display: inline-block;
  position: absolute;
  bottom: 40px;
  color: #f5f5f5;
  font-size: 16px;
  font-weight: 600;
`;

const Author = styled.span`
  display: inline-block;
  position: absolute;
  color: #f5f5f5;
  bottom: 16px;
`;

function Book({
  infoModalHandler,
  markModalHandler,
  isMypage,
  bookinfo,
  marked,
}) {
  return (
    <>
      <Container onClick={() => infoModalHandler(bookinfo)}>
        <BookCover src={bookinfo.coverimg}></BookCover>
        <HoverContainer>
          <div onClick={(event) => event.stopPropagation()}>
            {isMypage ? null : (
              <Bookmark
                onClick={() => markModalHandler(bookinfo)}
                marked={marked}
                icon={faBookmark}
                size="2x"
              />
            )}
          </div>
          <Title>{bookinfo.title}</Title>
          <Author>{bookinfo.author}</Author>
        </HoverContainer>
      </Container>
    </>
  );
}

export default Book;
