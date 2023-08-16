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
      if (response.status === 200) {
        localStorage.setItem(
          'access_token',
          JSON.stringify(response.data.access_token)
        );
        navigate('/todo');
      }
    } catch (e) {
      console.log(e.message);
      alert(`아이디 혹은 비밀번호를 확인해주세요.`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
    }
  }, [navigate]);

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={submitHandler}>
        E-MAIL :{' '}
        <input
          data-testid='email-input'
          name='email'
          value={userMail.value}
          onChange={userMail.onChange}
        />
        <br />
        PASSWORD :{' '}
        <input
          data-testid='password-input'
          type='password'
          value={userPw.value}
          onChange={userPw.onChange}
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
