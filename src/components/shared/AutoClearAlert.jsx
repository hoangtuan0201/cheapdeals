import { useState, useEffect } from "react";
import { Alert } from "@mui/material";

const AutoClearAlert = ({ 
  message, 
  severity = "error", 
  duration = 3000, 
  onClear,
  style = {} 
}) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClear) {
          onClear();
        }
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, duration, onClear]);

  if (!visible || !message) {
    return null;
  }

  return (
    <Alert
      severity={severity}
      sx={{
        width: "100%",
        maxWidth: "320px",
        margin: "10px 0",
        fontFamily: '"Poppins", sans-serif',
        fontSize: "13px",
        animation: "fadeIn 0.3s ease-in",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(-10px)" },
          to: { opacity: 1, transform: "translateY(0)" }
        },
        ...style
      }}
    >
      {message}
    </Alert>
  );
};

export default AutoClearAlert;
