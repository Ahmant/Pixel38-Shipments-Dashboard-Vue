import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
	state: () => ({
		notifications: {}
	}),
	actions: {
		notify(type, body, title = null, data = {}) {
			let uid = Date.now().toString() + parseInt(Math.random() * 100000)
			this.notifications = Object.assign({[uid]: {
				title: title,
				body: body,
				type: type,
				data: data
			}}, this.notifications)

			setTimeout(() => {
				delete this.notifications[uid]
			}, data.duration ?? 3000)
		},
	},
})
