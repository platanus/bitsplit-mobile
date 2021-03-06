import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useToggle from '../../utils/hooks/useToggle';
import { SET_PIN, LOGOUT_REQUEST } from '../../store/types';
import encrypt from '../../utils/helpers/encrypt';

export default function usePin(
  compRef,
  initialState,
  pinLength,
  maxTries,
  onSuccess = () => {},
  onFailure = () => {}
) {
  const [state, setState] = useState({
    ...initialState,
    previousPin: '',
    currentTries: 0,
  });
  const [isDisplayVisible, toggleDisplay] = useToggle(true);
  const { pin: storedPin, loading: closingSession } = useSelector(
    storage => storage.auth
  );
  const dispatch = useDispatch();

  // will show the keyboard on mount.
  useEffect(() => {
    if (compRef.input && !closingSession) compRef.input.focus();
  }, [compRef.input, closingSession]);

  const setPin = newPin => {
    if (!state.previousPin) {
      setState(prevState => ({
        ...prevState,
        inputPin: '',
        previousPin: newPin,
        message: 'Confirme el PIN previo',
      }));
    } else if (newPin === state.previousPin) {
      dispatch({ type: SET_PIN, payload: newPin });
      onSuccess();
      toggleDisplay();
    } else {
      setState(prevState => ({
        ...prevState,
        previousPin: '',
        inputPin: '',
        message: 'PIN no coincide al previo\nIntentelo Nuevamente',
      }));
    }
  };

  const checkPin = async currentPin => {
    const encryptedPin = await encrypt(currentPin);
    if (encryptedPin === storedPin) {
      toggleDisplay();
      onSuccess();

      return;
    }
    setState(prevState => ({ ...prevState, message: 'PIN no coincide' }));
    if (state.currentTries === maxTries - 1) {
      onFailure();
      dispatch({ type: LOGOUT_REQUEST });
    }

    setState(prevState => ({
      ...prevState,
      currentTries: state.currentTries + 1,
    }));
  };

  const onChangePin = text => {
    if (!text || text[text.length - 1] !== '.') {
      setState(prevState => ({ ...prevState, inputPin: text }));
      if (text.length === pinLength) {
        (storedPin ? checkPin : setPin)(text);

        setState(prevState => ({ ...prevState, inputPin: '' }));
      }
    }
  };

  return { isDisplayVisible, onChangePin, storedPin, ...state, closingSession };
}
