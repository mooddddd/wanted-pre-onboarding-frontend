import { useNavigate } from 'react-router-dom';
import { useInput } from '../organisms/hooks';
import { request } from '../organisms/utils';
import { useEffect } from 'react';

export const Signin = () => {
  const navigate = useNavigate();
  const userMail = useInput('');
  const userPw = useInput('');

  const buttonHandler = () => {
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isInvalidEmail = !isValidEmail.test(userMail.value);
    const isInvalidPassword = userPw.value.length < 8;

    return isInvalidEmail || isInvalidPassword;
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let body = { email: userMail.value, password: userPw.value };
      const response = await request.post('/auth/signin', body);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem(
          'access_token',
          JSON.stringify(response.data.access_token)
        );
        navigate('/todo');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
    }
  }, []);

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={submitHandler}>
        E-MAIL : <input data-testid='email-input' {...userMail} name='email' />
        <br />
        PASSWORD :{' '}
        <input
          data-testid='password-input'
          type='password'
          {...userPw}
          name='password'
        />
        <br />
        <button
          data-testid='signin-button'
          disabled={buttonHandler()}
          type='submit'
        >
          로그인
        </button>
      </form>
    </div>
  );
};

// 이메일, 비번 유효성 검사 기능 구현 => 조건 불통과시 button에 disabled 속성 넣기
// 이메일 조건 : @ 포함
// 비번 조건 : 8자 이상

// 정상적인 로그인 시 todo 경로로 이동 / 완료
// 로그인 성공시 res body에 JWT 포함하여 응답
// 응답받은 JWT는 로컬스토리지에 저장

// 로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지 접속시 /todo 경로로 리다이렉트
// 로컬스트로지지에 토큰이 없는 상태로 /todo 접속시 /signin 경로로 리다이렉트
