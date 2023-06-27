import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "./ui/Button";
import { authApiAction } from "../redux/slices/apiSlices/authApiSlice/authApiSlice";
import { signin } from "../services/authentication";

const StyledLabel = styled.label``;
const StyledInput = styled.input``;

const validateInput = (email, pw) => {
  if (!email || !pw) {
    alert("이메일과 비밀번호를 모두 입력해 주세요.");
    return false;
  }
  return true;
};

const Signin = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const changeEmailHandler = (e) => {
    setEmail(e.target.value.trim());
  };

  const changePwHandler = (e) => {
    setPw(e.target.value.trim());
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValidated = validateInput(email, pw);
    if (!isValidated) return;

    dispatch(authApiAction.actionRequestedLogin());

    try {
      await signin(email, pw);
      dispatch(authApiAction.actionSuccessLogin());
      alert(`로그인에 성공하셨습니다.`);
    } catch (error) {
      console.log(error);
      dispatch(authApiAction.actionFailedLogin(error.message));
      alert(`로그인에 실패하였습니다: ${error.message}`);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <StyledInput
          id="email"
          type="email"
          onChange={changeEmailHandler}
          value={email}
        />
        <StyledLabel htmlFor="pw">비밀번호</StyledLabel>
        <StyledInput
          id="pw"
          type="password"
          onChange={changePwHandler}
          value={pw}
        />
        <Button>로그인</Button>
      </form>
    </>
  );
};

export default Signin;