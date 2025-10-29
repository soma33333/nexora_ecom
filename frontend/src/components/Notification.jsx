import React from "react";
import { useNotification } from "../context/NotificationContext";
import "../styles/style.css"

export default function Notification() {
  const { message } = useNotification();

  if (!message) return null;

  return (
    <div className="notification">
      {message}
    </div>
  );
}
