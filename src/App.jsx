import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import useInput from './hooks/useInput';

const validateEmail = (value) => value.includes('@');
const validatePassword = (value) => value.length >= 6;

function App() {
  // The state of the overall forms validity
  const [formIsValid, setFormIsValid] = useState(false);

  // Use useInput by destructuring the returned values
  const {
    value: emailValue,
    isValid: emailValid,
    hasError: emailHasError,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    reset: emailReset,
  } = useInput('', validateEmail);

  const {
    value: passwordValue,
    isValid: pwValid,
    hasError: passwordHasError,
    onChange: onPasswordChange,
    onBlur: onPasswordBlur,
    reset: passwordReset,
  } = useInput('', validatePassword);

  // Checks form validity upon state change to emailIsValid or pwIsValid and updates the button's disabled attribute
  useEffect(() => {
    emailValid && pwValid ? setFormIsValid(true) : setFormIsValid(false);
  }, [emailValid, pwValid]);

  const onSubmit = () =>
    console.log('email ', emailValue, 'password ', passwordValue);

  const onReset = () => {
    emailReset();
    passwordReset();
  };

  return (
    <>
      <h2>Login</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type='email'
          placeholder='email'
          value={emailValue}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        {emailHasError && (
          <p style={{ fontSize: '8px', color: 'red' }}>Email is not valid</p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type='password'
          placeholder='password'
          value={passwordValue}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
        {passwordHasError && (
          <p style={{ fontSize: '8px', color: 'red' }}>Password is not valid</p>
        )}
      </div>
      <button onClick={onReset}>Reset</button>
      <button disabled={!formIsValid} onClick={onSubmit}>
        Submit
      </button>
    </>
  );
}

export default App;
