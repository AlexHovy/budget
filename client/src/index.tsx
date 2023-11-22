import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import FirebaseConfig from "./config/FirebaseConfig";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationListener from "./listeners/NotificationListener";

FirebaseConfig.connect();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <NotificationListener />
      <App />
    </NotificationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
