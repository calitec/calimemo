/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function NotFound() {
  return (
    <section css={wrapper}>
      <h3>404 Not Found</h3>
      <p>
        페이지를 찾을 수 없습니다.
        <br />
        URL를 정확히 입력 해주시거나, 새로고침을 해주세요.
      </p>
    </section>
  );
}

const wrapper = css`
  height: 100vh;
  padding: 1em;
  h3 {
    font: 500 30px/30px "Noto Sans";
  }
  p {
    font: 400 16px/25px "Noto Sans";
  }
`;
