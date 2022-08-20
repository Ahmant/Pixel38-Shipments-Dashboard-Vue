import { defineStore } from "pinia";

export const useLoaderStore = defineStore({
	id: "loader",
	state: () => ({
		count: 0,
		text: ''
	}),
	actions: {
		start() {
			this.count++;
		},
		stop() {
			this.count--;
			if (this.count <= 0) {
				this.count = 0
				this.text = ''
			}
		},
		setText(text) {
			thistext = text;
		},
	},
});
