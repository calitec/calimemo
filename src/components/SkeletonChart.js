/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Spin } from "antd";

export default function SkeletonChart() {
  return (
    <div css={wrapper}>
      <div></div>
      <span></span>
      <p></p>
    </div>
  );
}

const wrapper = css`
  div,
  span,
  p {
    -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
    animation: skeleton-gradient 1.8s infinite ease-in-out;
  }
  div {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
  span {
    margin-top: 15px;
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
  @media screen and (max-width: 768px) {
    div {
      height: auto;
      padding-top: 70%;
    }
  }
`;
