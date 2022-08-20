import { useHandleHttpError } from '@/plugins/useHandleHttpError'
import axios from "axios";

const handleHttpError = useHandleHttpError()

let instance = axios.create({
	withCredentials: true,
	baseURL: process.env.VUE_APP_API_URL + "/", // Sanctum Authentication: In order to authenticate, your SPA and API must share the same top-level domain.
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

        return Promise.reject(error);
	}
);

export default instance;