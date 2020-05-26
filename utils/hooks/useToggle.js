import { useState } from 'react';

const useToggle = (startState = false) => {
  const [state, setState] = useState(startState);
  const toggle = () => setState(!state);

  return [state, toggle];
};

export default useToggle;
