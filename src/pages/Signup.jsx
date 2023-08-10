import { useInput } from '../organisms/hooks';
import { useNavigate } from 'react-router-dom';
import { request } from '../organisms/utils';

export const Signup = () => {
  const userMail = useInput('');
  const userPw = useInput('');
  const navigate = useNavigate();

  const buttonHandler = () => {
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isInvalidEmail = !isValidEmail.test(userMail.value);
    const isInvalidPassword = userPw.value.length < 8;

    return isInvalidEmail || isInvalidPassword;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let body = new FormData(e.target);
    await request.post('/auth/signup', body);
    navigate('/signin');
  };

  return (
    <>
      <div>
        <h1>회원가입 페이지</h1>
        <form onSubmit={submitHandler}>
          E-MAIL
          <input data-testid='email-input' {...userMail} name='email' />
          <br />
          PASSWORD
          <input
            data-testid='password-input'
            type='password'
            {...userPw}
            name='password'
          />
          <br />
          <button data-testid='signin-button' disabled={buttonHandler()}>
            회원가입
          </button>
        </form>
      </div>
    </>
  );
};
