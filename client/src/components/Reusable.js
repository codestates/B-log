import styled from "styled-components";
import Qwigley from "../assets/fonts/Qwigley-Regular.woff";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

export const Title = styled.h2`
  @font-face {
    font-family: "Qwigley";
    src: local("Qwigley"), url(${Qwigley}) format("woff");
  }
  font-family: "Qwigley", "cursive";
  font-size: 80px;
  color: #594d49;
  margin-bottom: 40px;
  display: block;
`;

export const InputContainer = styled.div`
  padding: 16px;

  :nth-last-of-type(2) {
    margin-bottom: 60px;
  }
`;

export const Desc = styled.div`
  color: #8d8d8d;
`;

export const Input = styled.input`
  display: block;
  border: none;
  border-bottom: 1px solid #8d8d8d;
  height: 36px;
  width: 200px;
  margin: 0;
  margin: 5px 0px;

  :focus {
    background-color: #f5f5f5;
    outline: none;
  }
`;

export const ErrorMsg = styled.span`
  display: inline-block;
  color: #9c5230;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
`;

export const ModalBackground = styled.div`
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

export const CloseBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
  font-size: 26px;
`;
