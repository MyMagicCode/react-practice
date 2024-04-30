import { useNavigate } from "react-router-dom";
import "./home.scss";
import { CSSProperties, useEffect, useRef } from "react";
import { menuList } from "../config/pages.config";

export function Home() {
  const navigate = useNavigate();
  const cardSet = useRef(new Set<HTMLElement>());

  const handleClick = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const calcCardsPosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cardSet.current.forEach((card) => {
        const { left, top } = card.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");
      });
    };
    document.addEventListener("mousemove", calcCardsPosition);
    return () => document.removeEventListener("mousemove", calcCardsPosition);
  }, []);

  return (
    <div className="home">
      <div
        className="home-container"
        style={
          {
            "--bg-color": "rgb(249, 115, 22)",
          } as CSSProperties
        }>
        <p className="title">React进阶练习</p>
        <div className="list">
          {menuList.map((item: any) => (
            <div
              ref={(el) => {
                el && cardSet.current.add(el);
              }}
              key={item.path}
              onClick={() => handleClick(item.path)}
              className="list_card">
              <div className="view custom-scrollbar">
                <h5 className="label">{item.label}</h5>
                <p className="describe">{item.describe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
