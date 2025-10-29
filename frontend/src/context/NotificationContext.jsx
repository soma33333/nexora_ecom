import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000); // disappear after 2 sec
  };

  return (
    <NotificationContext.Provider value={{ message, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
