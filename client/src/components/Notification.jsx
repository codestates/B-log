import { useEffect, useState } from "react";
import styled from "styled-components";

export const Notify = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0d8;
  border-radius: 3rem;
  position: absolute;
  width: 400px;
  height: 50px;
  z-index: 999999;
  left: 50% - 200px;
  top: 30px;
  transition: transform 0.6s ease-in-out;
  animation: toast-in-right 0.6s;
  transition: 0.6s ease;

  @keyframes toast-in-right {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: translateY(0px);
    }
  }

  > .message {
    padding: 4px 12px;
    border-radius: 1rem;
  }

  > .fade {
    opacity: 0;
    transform: opacity 1.5s;
  }
`;

function Notification({ message, time }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setIsFading(true);
      }
    }, time);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Notify>
      <div className={`message ${isFading ? "fade" : ""}`}>{message}</div>
    </Notify>
  );
}
export default Notification;
