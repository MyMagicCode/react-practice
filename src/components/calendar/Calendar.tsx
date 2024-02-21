import type { Dayjs } from "dayjs";
import MonthCalendar from "./MonthCalendar";
import Header from "./Header";
import {
  useState,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
} from "react";
import Provider from "./LocaleContent";
import dayjs from "dayjs";

export interface CalendarProp {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格,内容会被添加到单元格内，只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProp) {
  const { value, locale, onChange } = props;

  const [curValue, setCurValue] = useState<Dayjs>(value || dayjs(Date.now()));
  const [curMonth, setCurMonth] = useState<Dayjs>(value || dayjs(Date.now()));

  const changeDate = useCallback(
    (date: Dayjs) => {
      setCurValue(date);
      setCurMonth(date);
      onChange?.(date);
    },
    [onChange]
  );

  useEffect(() => {
    changeDate(value);
  }, [value, changeDate]);

  const selectHandle = (date: Dayjs) => {
    changeDate(date);
  };

  const nextMonthHandle = useCallback(() => {
    setCurMonth((date) => date.add(1, "month"));
  }, []);

  const prevMonthHandle = useCallback(() => {
    setCurMonth((date) => date.subtract(1, "month"));
  }, []);

  const todayHandle = useCallback(() => {
    const nowDate = dayjs(Date.now());

    changeDate(nowDate);
  }, [changeDate]);

  return (
    <Provider locale={locale}>
      <Header
        value={curMonth}
        todayHandle={todayHandle}
        prevMonthHandle={prevMonthHandle}
        nextMonthHandle={nextMonthHandle}
      />
      <MonthCalendar
        {...props}
        curMonth={curMonth}
        value={curValue}
        selectHandler={selectHandle}
      />
      ;
    </Provider>
  );
}

export default Calendar;
