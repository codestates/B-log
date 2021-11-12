import styled from "styled-components";

const StyledButton = styled.div`
  color: ${(props) => (props.color === "dark" ? "#f5f5f5" : "#202123")};
  background-color: ${(props) =>
    props.color === "dark" ? "#594d49;" : "transparent"};
  padding: 4px 10px;
  width: 120px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1.8px;
  border-style: solid;
  border-color: ${(props) =>
    props.color === "dark" ? "transparent" : "#594d49"};
  border-radius: 40px;
  cursor: pointer;
`;

function Button({ message, color }) {
  return (
    <>
      <StyledButton color={color}>{message}</StyledButton>
    </>
  );
}

export default Button;
