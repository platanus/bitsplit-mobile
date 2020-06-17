import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TRANSACTIONS_HISTORY } from '../../store/types';

export const usePaymentHistory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_TRANSACTIONS_HISTORY });
  }, []);
  const { payments, loading } = useSelector(state => state.transactions);

  return [payments, loading];
};
