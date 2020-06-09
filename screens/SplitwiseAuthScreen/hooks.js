import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SPLITWISE_POST_AUTH } from '../../store/types';

export const postSplitwiseAuthUrl = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SPLITWISE_POST_AUTH,
      payload: {},
    });
  }, []);
  const { authUrl } = useSelector(state => state.splitwise);
  return authUrl;
};
