import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SPLITWISE_GET_DEBTS } from '../../store/types';

export default function useSplitwiseSummary() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SPLITWISE_GET_DEBTS });
  }, []);

  const {
    debts: { friends_to_user: friendsToUser, user_to_friends: userToFriends },
    loading,
    isSync: isSplitSync,
  } = useSelector(state => state.splitwise);

  const sumByCurrency = (accumulator, current) => {
    if (!accumulator[current.currency_code]) {
      accumulator[current.currency_code] = 0;
    }
    accumulator[current.currency_code] += parseFloat(current.amount);

    return accumulator;
  };

  const debtsSummary = {
    toPay: userToFriends ? userToFriends.reduce(sumByCurrency, {}) : {},
    toCollect: friendsToUser ? friendsToUser.reduce(sumByCurrency, {}) : {},
  };

  // const toPay2 = debtsSummary.toPay.USD;

  // console.log('TO PAY: ', toPay2);

  return { debtsSummary, loading, isSplitSync };
}
