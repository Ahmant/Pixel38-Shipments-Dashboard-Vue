import { useNotificationsStore } from './notifications/store'

const notificationsStore = useNotificationsStore()

export function useHandleHttpError() {
	return (error) => {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx

			// console.log(error.response.data);
			// console.log(error.response.status);
			// console.log(error.response.headers);

			if (error.response.data) {
				if (error.response.data.errors) {
					Object.entries(error.response.data.errors).forEach(errors => {
						errors[1].forEach(_error => {
							console.log(_error)
							notificationsStore.notify('error', _error, null)
						})
					});
				}
				else if (error.response.data.message) {
					notificationsStore.notify('error', error.response.data.message, null)
				}
				else {
					notificationsStore.notify('error', error.response.statusText, null)
				}
			}
			else if (error.response.statusText) {
				notificationsStore.notify('error', error.response.statusText, null)
			}
			else {
				notificationsStore.notify('error', error.message, null)
			}
		} 
		// else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js

			// console.log(error.request);
		// }
		else {
			// Something happened in setting up the request that triggered an Error

			notificationsStore.notify('error', error.message, null)
		}
		//   console.log(error.config);
	}
}