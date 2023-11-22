import React, { createContext, useState, useContext, useCallback } from "react";
import Notification from "../components/Notification/Notification";
import { NotificationTypes } from "../constants/NotificationTypes";

interface NotificationContextType {
  showMessage: (
    message: string,
    type?: NotificationTypes,
    duration?: number
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState({
    message: "",
    type: NotificationTypes.DEFAULT,
    isVisible: false,
  });

  const showMessage = useCallback(
    (
      message: string,
      type = NotificationTypes.DEFAULT,
      duration: number = 3000
    ) => {
      setNotification({ message, isVisible: true, type });
      setTimeout(
        () => setNotification((n) => ({ ...n, isVisible: false })),
        duration
      );
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
      />
    </NotificationContext.Provider>
  );
};
