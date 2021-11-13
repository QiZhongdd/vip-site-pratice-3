import { useState, useEffect } from "react";
const useViewport = () => {
  // console.log("useViewPort");
  const [wh, setWH] = useState<number>(window.innerHeight);
  const [ww, setWW] = useState<number>(window.innerWidth);

  // didMount
  useEffect(() => {
    const handleWindowResize = () => {
      setWH(window.innerHeight);
      setWW(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    // return destroy 
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return {ww, wh};
};
export default useViewport;
