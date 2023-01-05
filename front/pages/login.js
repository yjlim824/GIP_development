import React, {useEffect}from 'react';
import AuthBackForm from '../components/loginRegister/authBackForm';
import LoginForm from '../components/loginRegister/loginForm';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import { LOAD_MY_INFO_REQUEST } from '../reducers/auth';
import wrapper from '../store/configureStore';



const LoginPage = () => {

  const { me } = useSelector((state) => state.auth);

  useEffect (() => {

  if (!(me && me.id)) {
      Router.replace('/login');
    } else {
      Router.replace('/dash');
    }

   }, [me && me.id]);
 

  return (
    <div>
      <AuthBackForm>
        <LoginForm />
      </AuthBackForm>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
  const cookie = req ? req.headers.cookie : '';
  //쿠키 공유되는 문제 해결
  axios.defaults.headers.Cookie = ''; 
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default LoginPage;