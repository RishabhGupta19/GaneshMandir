import React, { useEffect, useState } from "react";
import "./Toast.css";

const Toast = ({ message, type, onClose }) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Wait 3 seconds, then start exit animation
    const timer = setTimeout(() => {
      startExit();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const startExit = () => {
    setIsHiding(true);
    // Wait for animation to finish (400ms) before actually removing from DOM
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const getIcon = () => {
    if (type === "success") return "✅";
    if (type === "error") return "⚠️";
    return "ℹ️";
  };

  return (
    <div className={`toast toast-${type} ${isHiding ? "hiding" : ""}`}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "1.2rem" }}>{getIcon()}</span>
        <span>{message}</span>
      </div>
      <button className="toast-close" onClick={startExit}>
        &times;
      </button>
    </div>
  );
};

export default Toast;