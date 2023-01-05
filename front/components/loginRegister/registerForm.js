import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';
import Button from '../common/Button';
import top_logo from '../../public/images/top_logo.png';
import { SIGN_UP_REQUEST } from '../../reducers/auth';


/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  p {
    margin: 0;
    color: gray;
    margin-bottom: 1rem;
    margin-top: 0.7rem;
    font-size:27pt;
    font-weight:900;
    font-family:"NanumSquareRoundEB";
  }
  .logo {
    width: 270px;
    margin-bottom: 50px;
  }
  .pw {
    font-size: 10pt;
    font-weigt:normal;
  }
  .id {
    margin-top: 45px;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  background: rgba(255,255,255,0.8);
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  outline: none;
  width: 100%;
  font-family:"NanumSquareRoundR";
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid gray;
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: gray;
    text-decoration: underline;
    &:hover {
      color: gray;
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;



const RegisterForm = () => {
  const dispatch = useDispatch();
  const { signUpDone, signUpLoading, signUpError } = useSelector((state) => state.auth);
  const [userid, onChangeId] = useInput('');
  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (signUpDone) {
      setError('사용자등록이 완료됐습니다.');
      Router.push('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      //alert(signUpError);
    }
  }, [signUpError]);
  
  const authority = 2; //회원가입시 무조건 대기자로 가입됨 0:관리자 1:사용자 2:대기자

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();    
    console.log(userid, username, password, passwordConfirm);
    console.log(signUpDone);
    let password1RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; // 비밀번호 조건



    if (!password){
      setError('비밀번호를 입력해주세요');
    }
    //비밀번호 조건에 맞지 않을 시
    else if (!password1RegExp.test(password)) {
      setError('비밀번호는 최소 하나의 문자, 숫자, 특수문자 포함. 8자리 이상으로 입력하세요');
    }
    //새비밀번호와 새비밀번호가 같을 시
    else if (password === passwordConfirm){
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { userid, username, password, authority },
      });
      
      return 0; 
    }
    //새비번과 새비번확인이 다를시
    else if (password !== passwordConfirm) {
      setError('비밀번호가 다릅니다.')
    }
    //onChangePassword('');//새비밀번호 적는 곳 초기화
    //onChangePasswordConfirm('');// 비밀번호 확인 적는 곳 초기화

    // dispatch({
    //   type: SIGN_UP_REQUEST,
    //   data: { userid, username, password, authority },
    // });
    // console.log(signUpDone, 'dddqwer');
    //window.location.reload();
  },[userid, username, password, passwordConfirm]);




  return (
    <>
    <AuthFormBlock>
      <div>
        <Image className="logo" src={top_logo}/>
      </div>
      <form onSubmit={onSubmitForm}>
        <StyledInput
          className='id'
          autoComplete="username"
          name="username"
          onChange={onChangeId}
          value={userid}
          placeholder=" 아이디"
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          onChange={onChangePassword}
          value={password}
          placeholder=" 비밀번호 "
          type="password"
        />
        <StyledInput
          autoComplete="new-password"
          name="passwordConfirm"
          onChange={onChangePasswordConfirm}
          value={passwordConfirm}
          placeholder=" 비밀번호 확인"
          type="password"
        />
        <p className='pw'>특수문자, 영문, 숫자를 포함 8자 이상</p>      
        <StyledInput
            autoComplete="name"
            name="name"
            onChange={onChangeUsername}
            value={username}
            placeholder=" 이름"
          />

        {signUpError && <ErrorMessage>{signUpError}</ErrorMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop loginpage fullWidth style={{ marginTop: '1rem' }} loading={signUpLoading}>
          사용자 등록
        </ButtonWithMarginTop>
      </form> 
      <Footer>
      <Link href="/login">로그인</Link>
      </Footer> 
    </AuthFormBlock>
    {/* <button onClick={onSubmitForm}>test</button> */}
    </>
  );
};

export default RegisterForm;
