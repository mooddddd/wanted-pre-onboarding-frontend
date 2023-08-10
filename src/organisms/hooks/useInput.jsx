import { useState } from 'react';

export const useInput = (initState) => {
  const [value, setValue] = useState(initState);
  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  return { value, onChange };
};
