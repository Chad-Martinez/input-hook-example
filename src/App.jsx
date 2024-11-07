import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import useInput from './hooks/useInput';

const validateEmail = (value) => {
  return value.includes('@');
};

function App() {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: emailValue,
    valueIsValid: emailValid,
    hasError: emailHasError,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    reset: emailReset,
  } = useInput('', validateEmail);
  const {
    value: passwordValue,
    valueIsValid: pwValid,
    hasError: passwordHasError,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    reset: passwordReset,
  } = useInput('', (value) => value !== '');

  useEffect(() => {
    if (emailValid && pwValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [emailValid, pwValid]);

  const onSubmit = () =>
    console.log('email ', emailValue, 'password ', passwordValue);

  const onReset = () => {
    emailReset();
    passwordReset();
  };

  return (
    <>
      <h1>Login</h1>
      <div className='card'>
        <input
          type='email'
          placeholder='email'
          value={emailValue}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        {emailHasError && <p className='error'>Email is not valid</p>}
        <input
          type='password'
          placeholder='password'
          value={passwordValue}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
        {passwordHasError && <p className='error'>Password is not valid</p>}
      </div>
      <button disabled={!formIsValid} onClick={onSubmit}>
        Submit
      </button>
      <button onClick={onReset}>Reset</button>
    </>
  );
}

export default App;
