import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./basic.css";

export default function BasicExample() {
  const [flag, setFlag] = useState(true);

  return (
    <>
      <CSSTransition
        in={flag}
        appear={true} // 出现时候也动画
        timeout={1000}>
        <div className="box">111</div>
      </CSSTransition>
      <button onClick={() => setFlag(!flag)}>切换</button>
    </>
  );
}
