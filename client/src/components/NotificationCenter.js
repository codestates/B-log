import { useSelector } from "react-redux";
import Notification from "./Notification";

function NofiticationCenter() {
  const state = useSelector((state) => state.notificationReducer);

  return (
    <>
      {state.notifications.map((noti) => (
        <Notification
          key={noti.uuid}
          message={noti.message}
          link={noti.link}
          time={noti.dismissTime}
        />
      ))}
    </>
  );
}

export default NofiticationCenter;
