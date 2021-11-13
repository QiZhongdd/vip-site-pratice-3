import React, { FC, ReactNode, useState, useEffect } from "react";
import "./totast.css";
type ITotast = {
  children?: ReactNode;
  visible: Boolean;
  msg?: string;
};

const Totast: FC<ITotast> = ({ visible = false, msg = "服务开小差了" }) => {
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsShow(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {visible && isShow ? (
        <div className="modal">
          <div className="tip-msg">{msg}</div>
        </div>
      ) : null}
    </>
  );
};

export default React.memo(Totast);
