import { useState } from 'react';

const useInput = (defaultValue, validator) => {
  const [value, setValue] = useState(defaultValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validator(value);
  const hasError = !valueIsValid && isTouched;

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => setIsTouched(true);

  const reset = () => {
    setValue(defaultValue || '');
    setIsTouched(false);
  };

  return {
    value,
    valueIsValid,
    hasError,
    onChange,
    onBlur,
    reset,
  };
};

export default useInput;

// timothol@yahoo.com
