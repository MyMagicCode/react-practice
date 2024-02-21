import { ReactNode, useState } from "react";
import "./style.css";

interface ICalendarProps {
  value: Date;
  onChange: (value: Date) => void;
}

function Calendar({ value, onChange }: ICalendarProps) {
  const [date, setDate] = useState(new Date(value));
  const currentDay = value;

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const handleSelected = (date: Date) => {
    onChange(date);
  };

  const tableContent = generateDays(date, handleSelected, currentDay);

  return (
    <div className="calendar">
      <div className="calendar_header">
        <button onClick={handlePrevMonth}>&lt;</button>
        {date.getFullYear()}年{date.getMonth() + 1}月
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar_body">
        <table className="calendar_picker_content">
          <thead>
            <tr>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
              <th>七</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Calendar;

/**
 * 通过年份和月份获取当月的天数
 * @returns 返回当前月的天数
 */
function getCountDayOfMonth(year: number, month: number) {
  // 小技巧: 当天为0的时候就是上个月的最后一天
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 通过年份和月份获取当月第一天是星期几
 * @returns 当月第一天是周几
 */
function firstDayToWeekOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function generateDays(
  date: Date,
  onClick: (date: Date) => void,
  selected: Date
) {
  const rows: ReactNode[] = [];

  const daysCount = getCountDayOfMonth(date.getFullYear(), date.getMonth());
  const firstDay = firstDayToWeekOfMonth(date.getFullYear(), date.getMonth());

  let row: ReactNode[] = [];
  let day = 1;
  let i = 0;
  for (; i < firstDay - 1; i++) {
    row[i] = (
      <td key={"col" + i}>
        <div className="day">{"-"}</div>
      </td>
    );
  }

  for (; i < 42; i++) {
    const index = i % 7;
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
    let className = "day";
    className +=
      selected.getTime() === currentDate.getTime() ? " selected" : "";

    if (day <= daysCount) {
      row[index] = (
        <td key={"col" + i}>
          <div className={className} onClick={() => onClick(currentDate)}>
            {day}
          </div>
        </td>
      );
    } else {
      row[index] = (
        <td key={"col" + i}>
          <div className="day" onClick={() => onClick}>
            {"-"}
          </div>
        </td>
      );
    }
    if (row.length === 7) {
      rows.push(<tr key={"row" + i}>{[...row]}</tr>);
      row = [];
    }
    day++;
  }

  return rows;
}
