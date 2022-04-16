/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { Button } from "antd";
import { toast } from "react-toastify";
import { Spin } from "antd";
import axios from "axios";

export default function Date() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useSWR(`/date/${id}`, fetcher);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const [content, setContent] = useState({
    selectedDate: id,
    emotion: "",
    content: "",
  });

  useEffect(() => {
    if (data) {
      setContent((prev) => ({
        ...prev,
        emotion: data.emotion,
        content: data.content,
      }));
    }
  }, [data]);

  const onSelectEmotion = (item, index) => {
    setContent((prev) => ({ ...prev, emotion: item }));
  };

  const onChange = (e) => {
    setContent((prev) => ({ ...prev, content: e.target.value }));
  };

  const onDestroy = async (e) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      try {
        await axios.delete(`/date/${id}`, content, {
          withCredentials: true,
        });
        mutate(`/date/${id}`);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onPostDiary = async (e) => {
    e.preventDefault();
    if (!data) {
      if (content.emotion == "" || content.content == "") {
        return toast.error("감정과 내용을 입력해 주세요.");
      }
      try {
        mutate("/date", content, false);
        setLoading(true);
        await axios.post("/date", content, {
          withCredentials: true,
        });
        setLoading(false);
        mutate("/date");
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        mutate(`/date/${id}`, content, false);
        setLoading(true);
        await axios.put(`/date/${id}`, content, {
          withCredentials: true,
        });
        setLoading(false);
        mutate(`/date/${id}`);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const notPosted = data !== null;
  const yetFetched = !data && !error;
  if ((notPosted && yetFetched) || loading) return <Spin css={spin} />;

  return (
    <section css={wrapper}>
      <ul>
        오늘 나의 감정은&nbsp;
        {["좋음", "보통", "나쁨"].map((item, index) => {
          return (
            <li
              key={item}
              className={content.emotion == item ? "active" : ""}
              onClick={() => onSelectEmotion(item)}
            >
              <span>{item.toUpperCase()}</span>
              <div className="check"></div>
            </li>
          );
        })}
      </ul>
      <textarea
        name="content"
        id=""
        cols="30"
        rows="10"
        value={content.content}
        onChange={onChange}
      />
      <Button type="primary" onClick={onPostDiary}>
        저장
      </Button>
      {data && <Button onClick={onDestroy}>삭제</Button>}
      <div>
        <Button type="link" onClick={goBack}>
          뒤로 가기
        </Button>
      </div>
    </section>
  );
}

const wrapper = css`
  padding: 1em;
  ul {
    display: flex;
    li {
      position: relative;
      margin: 0 0.3em;
      &:first-of-type {
        span {
          color: #55c024;
        }
      }
      &:nth-of-type(2) {
        span {
          color: #ffce00;
        }
      }
      &:last-of-type {
        span {
          color: #ff1515d9;
        }
      }
      span {
        font: 700 14px/14px "NotoSansKR";
        z-index: 1;
      }
      .check {
        display: inline-block;
        position: absolute;
        top: -5px;
        left: 10px;
        transform: rotate(45deg);
        height: 20px;
        width: 8px;
        border-bottom: 3px solid #78b13f;
        border-right: 3px solid #78b13f;
        opacity: 0;
        z-index: 0;
      }
      &.active {
        .check {
          opacity: 1;
        }
      }
    }
  }
  textarea {
    width: 100%;
    height: 60vh;
    padding: 1em;
    color: #363636;
    border: none;
    resize: none;
    outline: none;
    background-color: #eff2f5;
    &:focus {
      background-color: #ffffff;
      border: 1px solid #1890ff;
    }
    @media screen and (max-width: 768px) {
      height: 50vh;
    }
  }
  > .ant-btn {
    margin: 0.5em 0.5em 0.5em 0;
    border: 0;
    &:first-of-type {
      background-color: #363636;
    }
  }
  .ant-btn-default {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .ant-btn-link {
    padding: 0;
  }
`;

const spin = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
