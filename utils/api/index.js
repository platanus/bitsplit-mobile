import authApi from './auth';
import budaApi from './buda';
import splitwiseApi from './splitwise';

const api = { ...authApi, ...budaApi, ...splitwiseApi };
export default api;
