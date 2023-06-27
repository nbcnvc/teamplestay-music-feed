import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Button from "./ui/Button";
import { signup } from "../services/authentication";
import { authApiAction } from "../redux/slices/apiSlices/authApiSlice/authApiSlice";

const StyledLabel = styled.label``;
const StyledInput = styled.input``;

const validateInput = (email, pw) => {
  if (!email || !pw) {
    alert("이메일과 패스워드 모두 입력해 주세요.");
    return false;
  }
  return true;
};

const Signup = () => {
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

    dispatch(authApiAction.actionRequestedSignup());
    await signup(email, pw);
    dispatch(authApiAction.actionSuccessSignup());
<<<<<<< Updated upstream
    // alert(`${email}과 ${pw}로 회원가입을 합니다`);
    alert(`회원가입에 성공하셨습니다.`);
=======
>>>>>>> Stashed changes
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <StyledLabel htmlFor="email">이메일</StyledLabel>
        <StyledInput id="email" onChange={changeEmailHandler} value={email} />
        <StyledLabel htmlFor="pw">비밀번호</StyledLabel>
<<<<<<< Updated upstream
        <StyledInput
          id="pw"
          onChange={changePwHandler}
          value={pw}
          type="password"
        />
        <Button>회원가입</Button>
=======
        <StyledInput id="pw" onChange={changePwHandler} value={pw} />
        <Button>제출</Button>
>>>>>>> Stashed changes
      </form>
    </>
  );
};

export default Signup;
