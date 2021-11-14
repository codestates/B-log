import { useSelector } from "react-redux";
import Notification from "./Notification";

function NofiticationCenter() {
  const state = useSelector((state) => state.notificationReducer);

  return (
    <>
      {state.notifications.map((noti, idx) => (
        <Notification
          key={idx}
          message={noti.message}
          time={noti.dismissTime}
        />
      ))}
    </>
  );
}

export default NofiticationCenter;
