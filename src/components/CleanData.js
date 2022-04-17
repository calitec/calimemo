/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import moment from "moment";
import { SmileTwoTone, MehTwoTone, FrownTwoTone } from "@ant-design/icons";

export default function CleanData() {
  const { data, error } = useSWR("/date", fetcher);
  const [cleanData, setCleanData] = useState([]);

  useEffect(() => {
    if (data && data.length) {
      const obj = { 좋음: 0, 보통: 0, 나쁨: 0 };
      data.forEach((v) => {
        const candidates = moment(v.selectedDate).format("MMDD").substr(0, 2);
        const thisMonth = moment().format("MMDD").substr(0, 2);
        if (candidates == thisMonth) {
          if (v.emotion == "좋음") obj[v.emotion]++;
          if (v.emotion == "보통") obj[v.emotion]++;
          if (v.emotion == "나쁨") obj[v.emotion]++;
        }
      });
      setCleanData(obj);
    }
  }, [data]);

  return (
    <ul css={wrapper}>
      <span>이 달의 기분</span>
      {cleanData && (
        <>
          <li>
            <SmileTwoTone />
            <em>{cleanData["좋음"]}</em>
          </li>
          <li>
            <MehTwoTone />
            <em>{cleanData["보통"]}</em>
          </li>
          <li>
            <FrownTwoTone />
            <em>{cleanData["나쁨"]}</em>
          </li>
        </>
      )}
    </ul>
  );
}

const wrapper = css`
  display: flex;
  justify-content: start;
  padding: 1em;
  margin: 0;
  background-color: #ffffff;
  > span {
    position: relative;
    top: 3px;
    margin-right: 1em;
    font: 400 14px/14px "Noto Sans KR";
  }
  li {
    span,
    em {
      display: inline-block;
    }
    span {
      vertical-align: top;
      svg {
        font-size: 20px;
        path {
          fill: yellow;
        }
        path:not(:nth-of-type(2)) {
          fill: #000000;
        }
      }
    }
    em {
      font: 400 20px/20px "Noto Sans";
      margin: 0 1em 0 0.5em;
    }
  }
`;
