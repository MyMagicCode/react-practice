import type { Dayjs } from "dayjs";
import "./header.scss";
import { useLocaleContent } from "./LocaleContent";
import allLocales from "./locale";

export interface HeaderProps {
  value: Dayjs;
  nextMonthHandle: () => void;
  prevMonthHandle: () => void;
  todayHandle: () => void;
}

function Header(props: HeaderProps) {
  const { value, nextMonthHandle, prevMonthHandle, todayHandle } = props;
  const localeContext = useLocaleContent();

  const CalendarLocale = allLocales[localeContext.locale];

  return (
    <div className="calendar-head">
      <div className="calendar-head-left">
        <div onClick={() => prevMonthHandle()}>&lt;</div>
        <div>{value.format(CalendarLocale.formatMonth)}</div>
        <div onClick={() => nextMonthHandle()}>&gt;</div>
        <button onClick={() => todayHandle()}>{CalendarLocale.today}</button>
      </div>
    </div>
  );
}

export default Header;
