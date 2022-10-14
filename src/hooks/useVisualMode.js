import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), mode]);
    } else {
      setHistory(prev => [...prev, mode]);
    }
    // setMode(newMode);
  };
  const back = () => {
    if (history.length < 2)
      return;
    setHistory(prev => [...prev.slice(0, history.length-1)]);
  }
  return { mode: history[history.length-1], transition, back };
  //   const newHistory = [...history].slice(0, history.length -1);
  //   console.log(newHistory);
  //   if (history.length > 2) {
  //     setHistory(newHistory);
  //     setMode(newHistory[history.length - 1]);
  //     return;
  //   }
  //   setMode(history[history.length - 1]);
  // };
  // return { mode, transition, back };
};