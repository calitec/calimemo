import { useEffect, useState } from "react";

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });
  const { width, height } = screenSize;

  useEffect(() => {
    setScreenSize((prev) => ({
      ...prev,
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    }));
  }, []);

  return { width, height };
}
