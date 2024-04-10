import Dock from "./Dock";
import DockCard from "./DockCard";
import "./style.scss";

const GRADIENTS = [
  "https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/12.-Tumbleweed-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/36.-Pale-Chestnut-p-130x130q80.jpeg",
];

export default function DesktopExample() {
  return (
    <div className="body">
      <Dock>
        {GRADIENTS.map((src) => {
          return (
            <DockCard key={src}>
              <Card src={src}></Card>
            </DockCard>
          );
        })}
      </Dock>
    </div>
  );
}

interface CardProps {
  src: string;
}

export const Card = ({ src }: CardProps) => (
  <span className="card">
    <img className="card__blur" src={src} alt="" />
    <img className="card__img" src={src} alt="" />
  </span>
);
