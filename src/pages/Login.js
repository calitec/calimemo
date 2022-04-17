/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { myAxios } from "../utils/http";
import { Helmet } from "react-helmet-async";
import { SmileTwoTone } from "@ant-design/icons";

export default function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: localStorage.getItem("username") || "",
    password: "",
  });
  const { username, password } = info;
  const [saveUsername, setSaveUsername] = useState(false);
  const [error, setError] = useState("");
  const { data } = useSWR("/user", fetcher);

  useEffect(() => {
    if (data && data.isValid) {
      navigate("/");
    }
  }, [data]);

  useEffect(() => {
    if (info.username) {
      setSaveUsername(true);
    }
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const onCheckUsername = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSaveUsername(true);
    } else {
      setSaveUsername(false);
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();
    const data = info;
    try {
      const posted = await myAxios.post("/user/login", data, {
        withCredentials: true,
      });
      if (posted) {
        if (saveUsername) {
          localStorage.setItem("username", username);
        } else {
          localStorage.removeItem("username");
        }
        navigate("/");
      }
    } catch (err) {
      console.error(err.response);
      setError(err.response.data.message);
    }
  };

  const getTestUser = () => {
    setInfo((prev) => ({ ...prev, username: "test123", password: "test123" }));
  };

  return (
    <>
      <Helmet>
        <title>로그인 | Calimemo</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <section css={wrapper}>
        <div>
          <span>
            <SmileTwoTone />
          </span>
          <h3>로그인</h3>
        </div>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onSubmitCapture={onFinish}
          autoComplete="off"
        >
          <Input
            name="username"
            placeholder="아이디"
            value={username}
            required
            onChange={onChange}
          />

          <Input.Password
            name="password"
            placeholder="비밀번호"
            value={password}
            required
            onChange={onChange}
          />
          <div className="error-message">{error}</div>
          <Form.Item
            name="remember"
            valuePropName={saveUsername && "checked"}
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            onChange={onCheckUsername}
          >
            <Checkbox>로그인 아이디 기억하기</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
            <div className="forTest">
              <Button type="primary" htmlType="submit" onClick={getTestUser}>
                테스트 계정 로그인
              </Button>
            </div>
            아직 회원이 아니신가요? <Link to="/Register">회원가입 하기</Link>
          </Form.Item>
        </Form>
      </section>
    </>
  );
}

const wrapper = css`
  width: 20%;
  margin: 15vh auto 0;
  > div {
    position: relative;
    left: -8px;
    text-align: center;
    > span,
    h3 {
      display: inline-block;
    }
    span {
      vertical-align: top;
      margin-right: 3px;
      svg {
        font-size: 25px;
        path {
          fill: yellow;
        }
        path:not(:nth-of-type(2)) {
          fill: #000000;
        }
      }
    }
    h3 {
      display: inline-block;
      font: 500 25px/25px "Noto Sans KR";
      color: #363636;
      margin-bottom: 2em;
    }
  }

  form {
    > input,
    > span {
      margin-bottom: 1.5em;
      font: 400 14px/14px "Noto Sans KR";
      color: #363636;
    }
  }
  .ant-form-item-control-input-content {
    max-width: 100%;
    button {
      width: 100%;
      background-color: #363636;
      border: none;
    }
    a {
      display: inline-block;
      margin: 20px 0 0 0;
      font: 500 14px/14px "Noto Sans KR";
      color: #1890ff;
    }
    .forTest {
      margin: 1em 0;
    }
    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
  }
  .ant-form-item-control {
    margin-left: 0;
    max-width: 100%;
  }
  .error-message {
    color: red;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
