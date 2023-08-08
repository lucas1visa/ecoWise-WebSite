import React, { useState, useEffect } from "react";
import "./fiestaMessage.css";

const FiestaMessage = () => {
  const [backgroundColor, setBackgroundColor] = useState("#ff6347");

  const getRandomColor = () => {
    const colors = ["#ff6347", "#32cd32", "#1e90ff"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundColor(getRandomColor());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fiesta-message">
      <div className="message-box" style={{ backgroundColor }}>
        <h2 className="message-text">¡Usuario creado correctamente!</h2>
      </div>
    </div>
  );
};

export default FiestaMessage;
