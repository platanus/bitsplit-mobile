import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  BUDA_QUOTATION,
  BUDA_PAYMENT,
  SPLITWISE_PAY_DEBT,
  BUDA_CLEAN_ERROR,
  SPLITWISE_CLEAN_ERROR,
} from '../../../store/types';

const useSplitwisePayments = ({
  email,
  amount,
  currency_code,
  group_id,
  to_user_id,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: BUDA_QUOTATION, payload: amount });
    dispatch({ type: BUDA_CLEAN_ERROR });
    dispatch({ type: SPLITWISE_CLEAN_ERROR });
  }, []);

  const { wallet, error, quotation, loading } = useSelector(
    ({
      auth: {
        user: { wallet },
      },
      buda: { error: budaError, quotation, loading: loadingBuda },
      splitwise: { loading: loadingSplitwise, error: splitwiseError },
    }) => ({
      wallet,
      error: budaError || splitwiseError,
      quotation,
      loading: loadingBuda || loadingSplitwise,
    }),
    shallowEqual
  );
  const amountBtc = parseFloat(quotation ? quotation.amount_btc[0] : '0');

  function markAsPaid() {
    dispatch({
      type: SPLITWISE_PAY_DEBT,
      payload: {
        debt: {
          group_id,
          to_user_id,
          amount,
          currency_code,
        },
        callback: navigation.goBack,
      },
    });
  }

  function transfer() {
    dispatch({
      type: BUDA_PAYMENT,
      payload: { amountBtc, receptor: email, wallet },
      markAsPaid,
    });
  }

  return {
    amountBtc,
    transfer,
    loading,
    error,
  };
};

export default useSplitwisePayments;
