import { useState, useEffect } from 'react';

export default function useForm(initialState, options) {
  const { validations, sideEffects, errorMessages } = options;
  const [state, setState] = useState(initialState);
  const [oldState, setOldState] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    for (const field in state) {
      if (initialState[field] !== state[field] && oldState[field] !== state[field] && sideEffects[field]) {
        sideEffects[field](state[field]);
      }
    }
  }, [state, oldState]);

  function bind(field) {
    const id = field;
    const value = state[field];
    const onChangeText = text => {
      if (validations[field]) {
        if (!validations[field](text)) {
          setErrors({ ...errors, [field]: errorMessages[field] });

          return;
        }
      }
      setErrors({ ...errors, [field]: undefined });
      setOldState(state);
      setState({ ...state, [field]: text });
    };
    const errorMessage = errors[field];

    return { id, value, onChangeText, errorMessage };
  }

  return [state, bind];
}
