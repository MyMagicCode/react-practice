import logo from "./icons/react-icon.svg";

const Header = () => {
  return (
    <div className="h-14 flex justify-start items-center box-border px-5 border-b border-zinc-200 border-solid">
      <img src={logo} alt="" />
      <span className=" text-lg ml-3">React Playground</span>
    </div>
  );
};

export default Header;
