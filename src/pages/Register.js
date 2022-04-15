/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { httpCall } from "../utils/http";
import { toast } from "react-toastify";

export default function Register() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });
  const { username, password, passwordCheck } = info;
  const navigate = useNavigate();
  const { data } = useSWR("/user", fetcher);

  useEffect(() => {
    if (data && data.isValid) {
      navigate("/");
    }
  }, [data]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const onValidPassword = () => {
    const valid = password == passwordCheck;
    if (!password.length || !passwordCheck.length) {
      return <div className="password-check">* 모든 필드를 입력해 주세요.</div>;
    } else if (valid) {
      return (
        <div className="password-check valid">비밀번호가 일치 합니다.</div>
      );
    } else {
      return (
        <div className="password-check invalid">
          비밀번호가 일치하지 않습니다.
        </div>
      );
    }
  };

  const onFinish = async () => {
    const data = info;
    if (password !== passwordCheck) {
      return;
    }
    try {
      await httpCall("post", "/user", data);
      toast.info("회원가입이 완료 되었습니다.");
      navigate("/Login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section css={wrapper}>
      <h3>회원가입</h3>
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
        onFinish={onFinish}
        autoComplete="off"
      >
        <Input
          name="username"
          placeholder="아이디"
          value={username}
          onChange={onChange}
        />
        <Input.Password
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
        />
        <Input.Password
          name="passwordCheck"
          placeholder="비밀번호 재확인"
          value={passwordCheck}
          onChange={onChange}
        />

        {/* 패스워드 유효성 검사 */}
        {onValidPassword()}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
          계정이 이미 있으신가요? <Link to="/Login">로그인 하기</Link>
        </Form.Item>
      </Form>
    </section>
  );
}

const wrapper = css`
  width: 20%;
  margin: 15vh auto 0;
  h3 {
    font: 500 25px/25px "Noto Sans KR";
    color: #363636;
    text-align: center;
    margin-bottom: 2em;
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
    @media screen and (max-width: 768px) {
      max-width: 100%;
    }
  }
  .ant-form-item-control {
    margin-left: 0;
    max-width: 100%;
  }
  .password-check {
    position: relative;
    left: 0;
    margin: 1em 0 2em;
    font: 400 12px/12px "Noto Sans KR";
    &.valid {
      color: green;
    }
    &.invalid {
      color: red;
    }
    @media screen and (max-width: 768px) {
      left: 0;
    }
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;