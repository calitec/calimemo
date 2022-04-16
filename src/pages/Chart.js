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
import axios from "axios";
import SkeletonChart from "../components/SkeletonChart";
import { Button } from "antd";
import { myAxios } from "../utils/http";
import { Helmet } from "react-helmet-async";

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
        const placeData = await myAxios.get("/place", {
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
      const getPlace = await myAxios.get("/place", {
        withCredentials: true,
      });
      sessionStorage.setItem("place", JSON.stringify(getPlace.data));
      setPlace(getPlace.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>차트 | Calimemo</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <section css={wrapper}>
        <div>
          <span>나의 감정 그래프</span>
          <ResponsiveContainer width={"100%"} aspect={width < 414 ? 1 : 2}>
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
              <div className="suggestion-texts">
                <em>{place.name}</em>
                <p>{place.description}</p>
              </div>
            </>
          ) : (
            <SkeletonChart />
          )}
          <Button type="link" onClick={onRefresh}>
            다른 여행지 보기
          </Button>
        </div>
      </section>
    </>
  );
}

const wrapper = css`
  > div {
    width: 80%;
    padding: 0 2em 2em 2em;
    margin: 0 auto;
    > span {
      display: inline-block;
      font: 400 16px/16px "Noto Sans KR";
      color: #363636;
      margin: 0 0 2em 0;
    }
  }

  .suggestion {
    margin-top: 5%;
    div {
      position: relative;
      img {
        width: 100%;
        height: 500px;
        object-fit: cover;
      }
    }
    .suggestion-texts {
      margin-top: 1em;
      em,
      p {
        font: 12px/20px "Noto Sans KR";
        color: #363636;
      }
      em {
        font-weight: 500;
      }
      p {
        font-weight: 400;
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
        div {
          img {
            height: auto;
          }
        }
      }
    }
  }
`;
