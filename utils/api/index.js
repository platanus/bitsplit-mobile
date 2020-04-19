import authApi from './auth';
import budaApi from './buda';

const api = { ...authApi, ...budaApi };
export default api;
