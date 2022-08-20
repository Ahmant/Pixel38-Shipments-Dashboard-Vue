import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
	id: "sidebar",
	state: () => ({
		isOpen: null
	}),
	actions: {
		open() {
			this.isOpen = true
		},
		close() {
			this.isOpen = false
		},
		toggle() {
			if (this.isOpen) this.close()
			else this.open()
		},
	},
});
