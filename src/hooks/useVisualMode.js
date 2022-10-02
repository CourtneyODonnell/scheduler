import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setHistory(prev => [...prev, newMode]);
    setMode(newMode);
  };
  const back = () => {
    history.pop();
    setMode(history.slice(-1)[0]);
    setHistory(history);
  };

  return { mode, transition, back };
};