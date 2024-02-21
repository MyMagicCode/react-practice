import { useState } from "react";
import Calendar from "../index";
import dayjs from "dayjs";

function App() {
  const [data, setDate] = useState(dayjs());
  return (
    <>
      <p>{data.format("YYYY-MM-DD")}</p>
      <button
        onClick={() => {
          setDate(dayjs("2024-05-11"));
        }}
      >
        改变时间
      </button>
      <Calendar value={data} locale="zh-CN" />;
    </>
  );
}

export default App;
