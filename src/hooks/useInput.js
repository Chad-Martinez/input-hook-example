import { useState } from 'react';

const useInput = (defaultValue, validator) => {
  // The value of the input element managed by state
  const [value, setValue] = useState(defaultValue);
  // Manages whether the input has ever gained and lost focus
  const [isTouched, setIsTouched] = useState(false);

  // Validator is a function passed to useInput that returns a boolean based on your custom validation logic
  const isValid = validator(value);

  // hasError indicates an error exists if the input both fails valdiation and has also been touched
  const hasError = !isValid && isTouched;

  // Change Event Handler (fires on every key stroke)
  const onChange = (event) => setValue(event.target.value);

  // Blur Event Handler (fires when the input loses focus)
  const onBlur = () => setIsTouched(true);

  // Resets the state of the input
  const reset = () => {
    setValue(defaultValue || '');
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    onChange,
    onBlur,
    reset,
  };
};

export default useInput;
