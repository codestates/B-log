import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import axios from "axios";
import Notification from "./Notification";
import img from "../assets/images/book_cover.png";

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
  width: 800px;
  height: 500px;
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
const BookImg = styled.img`
  height: 90%;
  width: 40%;
  box-shadow: 5px 5px 10px 5px grey;
`;
const DescWapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 90%;
  width: 50%;
  /* border: 1px solid; */
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
  margin-top: 40px;
  font-size: 10px;
`;
const ButtonWrap = styled.div`
  right: 10px;
  bottom: 8px;
  display: flex;
  position: absolute;
`;
function BookInfoModal({ bookinfo, setInfoOpen }) {
  // const { title, author, publisher, coverimg, description, isbn13, pages } =
  //   bookinfo;

  //isOpen 상태, openModalHandler는 사용하는 페이지에서 props로 넘겨받아서 사용해야 할 듯
  const openModalHandler = () => {
    setInfoOpen(false);
  };
  //--------------------------------------------------------
  const [isNotify, setIsNotify] = useState(false);
  const [message, setMessage] = useState("");

  const clickHandler = (e) => {
    if (e.target.textContent === "읽고 있는 책") {
      // axios
      //   .post(
      //     "http://localhost:4000/mypage/rack",
      //     {
      //       title,
      //       author,
      //       publisher,
      //       coverimg,
      //       description,
      //       isbn13,
      //       pages,
      //     },
      //     { withCredentials: true }
      //   )
      //   .then(() => {
      //     setIsNotify(true);
      //     setMessage("랙에 책이 추가되었습니다.");
      //   });
      setIsNotify(true);
      setMessage("랙에 책이 추가되었습니다.");
    } else if (e.target.textContent === "다 읽은 책") {
      // axios
      //   .post(
      //     "http://localhost:4000/mypage/shelf",
      //     {
      //       title,
      //       author,
      //       publisher,
      //       coverimg,
      //       description,
      //       isbn13,
      //       pages,
      //     },
      //     { withCredentials: true }
      //   )
      //   .then(() => {
      //     setIsNotify(true);
      //     setMessage("책장에 책이 추가되었습니다.");
      //   });
      setIsNotify(true);
      setMessage("책장에 책이 추가되었습니다.");
    }
  };

  useEffect(() => {
    if (isNotify) {
      setTimeout(() => setIsNotify(false), 3000);
    }
  }, [isNotify]);
  return (
    <Wrapper onClick={openModalHandler}>
      {isNotify ? (
        <Notification message={message} isNotify={isNotify} time={3000} />
      ) : null}
      <ModalWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseBtn onClick={openModalHandler}>&times;</CloseBtn>
        <BookImg src={img} alt="책 표지" />
        <DescWapper>
          <Title>지적 대화를 위한 넓고 얕은 지식</Title>
          <Writer>채사장 | 한빛버즈</Writer>
          <Description>
            힘 있는 지식인이 되기 위한 필수 기초 교양! 어김없이 오늘도 우리는
            사람들과 대화를 나눈다. 어제 본 드라마부터 시작되는 대화는 늘 같은
            패턴이지만, 오늘따라 왜인지 시시한 기분이 든다. 곧 색다른 주제의
            대화를 이어가려 하지만 금방 지식에 한계가 오는 듯하다. 문득 자신의
            부족한 지식수준을 채우기 위해 공부를 시작해야겠다고 절감하지만, 금세
            막막해져온다. 대체 어디서부터 얼마만큼 알아야 하는 걸까? 여기,
            신자유주의가 뭔지, 보수와 진보가 무엇인지, 왜 사회문제가 일어나는지
            도무지 알 수가 없어 대화 자리가 두려운 당신을 위한 책이 출간되었다.
            글쓰기와 강연 등을 통해 많은 사람에게 ‘넓고 얕은 지식’을 알리고 있는
            채사장의 『지적 대화를 위한 넓고 얕은 지식』으로, 인기리에 연재되고
            있는 팟캐스트 방송 《지대넓얕》을 책으로 재구성한 것이다. 저자는
            역사·경제·정치·사회·윤리 전 과정을 마치 하나의 천일야화처럼 재미있는
            이야기로 자연스럽게 풀어낸다. 거칠고 거대한 흐름을 꿰다보면, 그
            과정에서 두 번의 세계대전이나 경제 대공황, 갑론을박하는 정치적 이슈
            등 개별적 사건들이 자연스럽게 자리를 찾으며 의미를 갖는다. 책을 덮는
            순간, 현실에 대해 당당한 지적 목소리를 내는 진짜 지식인으로 거듭날
            것이다.
          </Description>
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
