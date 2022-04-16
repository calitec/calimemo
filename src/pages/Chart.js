/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";
import useSWR from "swr";
import useScreenSize from "../hooks/useScreenSize";
import fetcher from "../utils/fetcher";
import { httpCall } from "../utils/http";
import { Button } from "antd";
import axios from "axios";

export default function Chart() {
  const { data, error } = useSWR("/date", fetcher);
  const [place, setPlace] = useState(null);
  const [graph, setGraph] = useState([]);
  const { width, height } = useScreenSize();

  useEffect(() => {
    const getPlaceAtSession = sessionStorage.getItem("place");
    if (getPlaceAtSession) {
      setPlace(JSON.parse(getPlaceAtSession));
      return;
    }
    const CancelToken = axios.CancelToken;
    let cancel;
    (async () => {
      try {
        const placeData = await axios.get("/place", {
          withCredentials: true,
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        });
        sessionStorage.setItem("place", JSON.stringify(placeData.data));
        setPlace(placeData.data);
        cancel = null;
      } catch (err) {
        console.error(err);
      }
      return () => cancel();
    })();
  }, []);

  useEffect(() => {
    let arr = [];

    function Emotions(name) {
      this.name = name;
      this.value = 0;
      this.count = function () {
        this.value++;
      };
    }

    const good = new Emotions("좋음");
    const bland = new Emotions("보통");
    const bad = new Emotions("나쁨");

    for (let item in data) {
      switch (data[item].emotion) {
        case "좋음":
          good.count();
          break;
        case "보통":
          bland.count();
          break;
        case "나쁨":
          bad.count();
          break;
        default:
      }
    }

    arr = [...arr, good, bad, bland];
    setGraph(arr);
  }, [data]);

  const onRefresh = async () => {
    try {
      setPlace(null);
      sessionStorage.clear();
      const getPlace = await axios.get("/place", {
        withCredentials: true,
      });
      sessionStorage.setItem("place", JSON.stringify(getPlace));
      setPlace(getPlace);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section css={wrapper}>
      <div>
        <span>나의 감정 그래프</span>
        <ResponsiveContainer width={"100%"} aspect={width < 414 ? 1 : 1.5}>
          <LineChart
            data={graph}
            margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="suggestion">
        <span>이번주는 여기 놀러가는거 어때요?</span>
        {place ? (
          <>
            <div>
              <img src={place.img} alt={place.name} />
            </div>
            <em>{place.name}</em>
            <p>{place.description}</p>
          </>
        ) : (
          <div className="skeleton">
            <div></div>
            <span></span>
            <p></p>
          </div>
        )}
        <Button type="link" onClick={onRefresh}>
          다른 여행지 보기
        </Button>
      </div>
    </section>
  );
}

const wrapper = css`
  display: flex;
  > div {
    width: 50%;
    padding: 0 2em 2em 2em;
    > span {
      display: inline-block;
      font: 400 16px/16px "Noto Sans KR";
      color: #363636;
      margin: 0 0 2em 0;
    }
  }

  .suggestion {
    div {
      position: relative;
      width: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 350px;
        object-fit: cover;
      }
    }
    em,
    p {
      font: 12px/12px "Noto Sans KR";
      color: #363636;
    }
    em {
      font-weight: 500;
    }
    p {
      font-weight: 400;
    }
    .skeleton {
      div,
      span,
      p {
        -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
        animation: skeleton-gradient 1.8s infinite ease-in-out;
      }
      div {
        width: 100%;
        height: 350px;
      }
      span {
        display: inline-block;
        width: 10%;
        height: 12px;
      }
      p {
        width: 20%;
        height: 12px;
      }
      @-webkit-keyframes skeleton-gradient {
        0% {
          background-color: rgba(165, 165, 165, 0.1);
        }
        50% {
          background-color: rgba(165, 165, 165, 0.3);
        }
        100% {
          background-color: rgba(165, 165, 165, 0.1);
        }
      }
      @keyframes skeleton-gradient {
        0% {
          background-color: rgba(165, 165, 165, 0.1);
        }
        50% {
          background-color: rgba(165, 165, 165, 0.3);
        }
        100% {
          background-color: rgba(165, 165, 165, 0.1);
        }
      }
    }
  }
  .ant-btn-link {
    padding: 0;
  }
  @media screen and (max-width: 768px) {
    display: block;
    > div {
      width: 100%;
      padding: 0 1em;
      &.suggestion {
        padding: 4em 1em 4em;
      }
    }
  }
`;
