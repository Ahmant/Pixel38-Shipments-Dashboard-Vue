import { defineStore } from "pinia";
import { useLoaderStore } from '@/plugins/loader/store'

const loader = useLoaderStore();

export const useUserStore = defineStore({
	id: "user",
	state: () => ({
		user: null
	}),
	actions: {
		set(user) {
			this.user = user
		},
		logout() {
			loader.start()

			localStorage.removeItem("auth_token");
			this.set(null);

			loader.stop()
		}
	},
});
