import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GET_WALLETS_BALANCES, SPLITWISE_GET_DEBTS } from '../../store/types';
import authedAxios from '../api/authedAxios';

export default function useStart() {
  const dispatch = useDispatch();
  const { auth: { user: { email } = {}, token } = {} } = useSelector(
    state => state
  );

  useEffect(() => {
    if (email && token) {
      authedAxios.createInstance({ email, token });
      dispatch({ type: GET_WALLETS_BALANCES });
      dispatch({ type: SPLITWISE_GET_DEBTS });
    }
  }, [email, token]);
}
