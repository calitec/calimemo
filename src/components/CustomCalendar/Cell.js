/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

export default function Cell(value) {
  const strToColor = {
    좋음: "#55c024",
    보통: "#ffce00",
    나쁨: "#ff1515d9",
  };

  const { data, error } = useSWR("/date", fetcher);

  const getDayInfo = () => {
    const infoData = data;
    let calendarData = [];

    for (let i in infoData) {
      const selectedDate = infoData[i].selectedDate;
      const momentDate = moment(selectedDate).format("YYYY-MM-DD");
      const thisDate = value.format("YYYY-MM-DD");
      if (momentDate === thisDate) {
        calendarData.push({
          emotion: infoData[i].emotion,
          content: infoData[i].content,
        });
      }
    }

    return calendarData || [];
  };

  const dayInfo = getDayInfo();

  return (
    <div>
      {dayInfo.length ? (
        dayInfo.map((info, index) => {
          return (
            <Link
              to={`/Date/${value.format("YYYYMMDD")}`}
              css={wrapper(strToColor[info.emotion])}
              key={index}
            >
              {info.emotion ? <span>{info.emotion}</span> : <span></span>}
            </Link>
          );
        })
      ) : (
        <Link to={`/Date/${value.format("YYYYMMDD")}`}>
          <span css={noneData}></span>
        </Link>
      )}
    </div>
  );
}

const wrapper = (emotion) => css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  span {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${emotion};
    font: 700 16px/16px "NotoSansKR";
  }
`;

const noneData = css`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
