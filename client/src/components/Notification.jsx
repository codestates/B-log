import { useEffect, useState } from "react";
import styled from "styled-components";

export const Notify = styled.div`
  position: fixed;
  z-index: 999999;
  left: 50%;
  top: 10px;
  transition: transform 0.6s ease-in-out;
  animation: toast-in-right 0.6s;
  transition: 0.3s ease;

  @keyframes toast-in-right {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: translateY(0px);
    }
  }

  > .message {
    border: 1px solid grey;
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
    }, time - 500);

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
