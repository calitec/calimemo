import React from "react";
import { Calendar } from "antd";
import locale from "antd/es/calendar/locale/ko_KR";
import Cell from "./Cell";

export default function CustomCalendar() {
  return <Calendar locale={locale} dateCellRender={Cell}></Calendar>;
}
