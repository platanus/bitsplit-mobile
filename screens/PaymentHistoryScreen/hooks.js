import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_GET_PAYMENT_HISTORY } from '../../store/types';

export const usePaymentHistory = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: BUDA_GET_PAYMENT_HISTORY});
    }, []);
    const { payments, loading } = useSelector(state => state.buda);
    
    return [payments, loading];
}
