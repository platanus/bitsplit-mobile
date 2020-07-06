import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SPLITWISE_GET_DEBTS } from '../../store/types';

const groupDebtsById = (friendsToUser, userToFriends) => {
  const debts = {};
  friendsToUser &&
    friendsToUser.forEach(
      ({ group_id, group_name, from, amount, currency_code }) => {
        if (!debts[group_id]) {
          debts[group_id] = {
            group_id,
            group_name,
            friendsToUser: [],
            userToFriends: [],
          };
        }
        debts[group_id].friendsToUser.push({ ...from, amount, currency_code });
      }
    );
  userToFriends &&
    userToFriends.forEach(
      ({ group_id, group_name, to, amount, currency_code }) => {
        if (!debts[group_id]) {
          debts[group_id] = {
            group_id,
            group_name,
            friendsToUser: [],
            userToFriends: [],
          };
        }
        debts[group_id].userToFriends.push({
          ...to,
          amount,
          currency_code,
          group_id,
        });
      }
    );

  return debts;
};

export const useSplitwiseDebts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SPLITWISE_GET_DEBTS });
  }, []);
  const { debts, loading } = useSelector(state => state.splitwise);

  const debtsByGroup = groupDebtsById(
    debts.friends_to_user,
    debts.user_to_friends
  );

  // El grupo con id=0 corresponde a las deudas individuales
  const { 0: singleDebts, ...groupDebts } = debtsByGroup;

  return [{ singleDebts, groupDebts: Object.values(groupDebts) }, loading];
};
