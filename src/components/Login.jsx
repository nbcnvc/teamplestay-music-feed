import React from "react";
import styled from "styled-components";
import Button from "./ui/Button";

function login() {
  const StyledLabel = styled.label``;
  const StyledInput = styled.input``;

  return (
    <>
      <form>
        <StyledLabel>이메일</StyledLabel>
        <StyledInput />
        <StyledLabel>비밀번호</StyledLabel>
        <StyledInput />
        <Button
          onClick={() => {
            alert(`로그인에 성공하셨습니다.`);
          }}
        >
          로그인
        </Button>
      </form>
    </>
  );
}
export default login;
