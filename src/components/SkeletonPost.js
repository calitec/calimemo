/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Spin } from "antd";

export default function SkeletonPost() {
  return (
    <div css={wrapper}>
      <ul>
        <div></div>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <textarea name="content" cols="30" rows="10" />
      <div></div>
      <div></div>
      <Spin css={spin} />
    </div>
  );
}

const wrapper = css`
  position: relative;
  padding: 1em;
  li,
  textarea,
  div:not(.ant-spin) {
    -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
    animation: skeleton-gradient 1.8s infinite ease-in-out;
    vertical-align: middle;
  }
  ul {
    div {
      display: inline-block;
      width: 5em;
      height: 1em;
      margin: 0 5px;
    }
    li {
      display: inline-block;
      width: 2.5em;
      height: 1em;
      margin: 0 5px;
    }
  }
  textarea {
    width: 100%;
    height: 60vh;
    padding: 1em;
    @media screen and (max-width: 768px) {
      height: 50vh;
    }
  }
  div {
    display: inline-block;
    width: 3.5em;
    height: 2em;
    margin: 5px 6px 0 0;
  }
  .ant-spin {
    background-color: transparent;
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
`;

const spin = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
