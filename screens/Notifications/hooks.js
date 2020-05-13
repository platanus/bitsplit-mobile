import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_NOTIFICATIONS } from '../../store/types';

export const useNotifications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: BUDA_NOTIFICATIONS });
  }, []);
  const { notifications, loading } = useSelector(state => state.buda);

  return [notifications, loading];
};
