import { useHandleHttpError } from '@/plugins/useHandleHttpError'
import axios from "axios";
import { useUserStore } from '../../stores/core/user';

const handleHttpError = useHandleHttpError()
const user = useUserStore()

let instance = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_API_URL + "/", // Sanctum Authentication: In order to authenticate, your SPA and API must share the same top-level domain.
});
instance.defaults.withCredentials = true
instance.interceptors.request.use(request => {
	const token = localStorage.getItem('auth_token');
    request.headers['Authorization'] =  token ? `Bearer ${token}` : '';
	
	request.headers.common['Accept'] = 'application/json';
	request.headers.common['Content-Type'] = 'application/json';

	return request;
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
        handleHttpError(error);
		
        if (error.response && error.response.status === 401) {
            user.logout();
            window.location.reload();
        }

        return Promise.reject(error);
	}
);

export default instance;