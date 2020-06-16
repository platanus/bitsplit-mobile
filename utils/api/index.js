import authApi from './auth';
import budaApi from './buda';
import splitwiseApi from './splitwise';
import transactionsApi from './transactions';

const api = { ...authApi, ...budaApi, ...splitwiseApi, ...transactionsApi };
export default api;
