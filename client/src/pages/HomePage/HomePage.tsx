import { useNotification } from "../../contexts/NotificationContext";
import "./HomePage.css";

function HomePage() {
  const { showMessage } = useNotification();

  return (
    <div>
      <button
        onClick={() =>
          showMessage("This is a notification!")
        }
      >
        Show Notification
      </button>
    </div>
  );
}

export default HomePage;
