import type { Dayjs } from "dayjs";
import { CalendarProp } from "./Calendar";
import { ReactNode } from "react";
import "./month-calendar.scss";
import dayjs from "dayjs";
import cs from "classnames";
import allLocales from "./locale";
import { useLocaleContent } from "./LocaleContent";

interface MonthCalendarProps extends CalendarProp {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

function MonthCalendar(props: MonthCalendarProps) {
  const locale = useLocaleContent();
  const CalendarLocale = allLocales[locale.locale];

  const {
    value,
    style,
    className,
    curMonth,
    dateRender,
    dateInnerContent,
    selectHandler,
  } = props;

  const weekList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const allDays = generateDays(curMonth);

  const classNames = cs("calendar", className);

  return (
    <div className={classNames} style={style}>
      <table className="calendar-context">
        <thead>
          <tr className="calendar_row">
            {weekList.map((item) => (
              <th className="calendar-context-head" key={item}>
                {CalendarLocale.week[item]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderDays(
            allDays,
            dateRender,
            dateInnerContent,
            value,
            selectHandler
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MonthCalendar;

interface IDay {
  date: Dayjs;
  current: boolean;
}

/**
 * 生成当前日期的日历列表对象
 */
function generateDays(value: Dayjs): IDay[] {
  // 获取当月的第一天的dayjs对象
  const startData = dayjs(value).startOf("month");
  // 获取第一天位于星期几
  const day = startData.day();

  const days: IDay[] = new Array(6 * 7);

  // 补齐日期前面空的日期
  for (let i = 0; i < day; i++) {
    days[i] = {
      date: startData.subtract(day - i, "day"),
      current: false,
    };
  }

  for (let i = day; i < days.length; i++) {
    const calcDate = startData.add(i - day, "day");
    days[i] = {
      date: calcDate,
      current: calcDate.month() === startData.month(),
    };
  }

  return days;
}

function renderDays(
  days: IDay[],
  dateRender: MonthCalendarProps["dateRender"],
  dateInnerContent: MonthCalendarProps["dateInnerContent"],
  value: Dayjs,
  selectHandler: MonthCalendarProps["selectHandler"]
): ReactNode[] {
  const dayNodes = [];
  for (let i = 0; i < 6; i++) {
    const row = days.slice(i * 7, i * 7 + 7);

    dayNodes.push(
      <tr key={"row-" + i}>
        {row.map((cell) => {
          let className = cs("calendar-cell", {
            "calendar-cell-current": cell.current,
          });

          const selected =
            value.format("YYYY-MM-DD") === cell.date.format("YYYY-MM-DD");
          return (
            <td className={className} key={cell.date.format()}>
              <div
                className={cs("calendar-cell-inner", {
                  "calendar-cell-selected": selected,
                })}
                onClick={() => selectHandler?.(cell.date)}
              >
                <div className="calendar-cell-value">
                  {dateRender ? dateRender(cell.date) : cell.date.date()}
                </div>
                <div className="calendar-cell-content">
                  {dateInnerContent?.(cell.date)}
                </div>
              </div>
            </td>
          );
        })}
      </tr>
    );
  }
  return dayNodes;
}
