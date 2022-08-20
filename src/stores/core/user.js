import { defineStore } from "pinia";
import { useLoaderStore } from '@/plugins/loader/store'

const loader = useLoaderStore();

export const useUserStore = defineStore({
	id: "user",
	state: () => ({
	}),
	actions: {
		logout() {
			loader.start()

			localStorage.removeItem("auth_token");

			loader.stop()
		}
	},
});
