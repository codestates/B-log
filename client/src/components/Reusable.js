import styled from "styled-components";
import Poppins from "../assets/fonts/Poppins-ExtraLight.woff";

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
    font-family: "Poppins";
    src: local("Poppins"), url(${Poppins}) format("woff");
  }
  font-family: "Poppins", sans-serif;
  font-size: 40px;
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
  background-color: transparent;
  :focus {
    outline: none;
    border-bottom: 1px solid #8d8d8d;
    background-color: #f0f0f0;
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
