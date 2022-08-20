import { defineStore } from "pinia";
import { useLoaderStore } from '@/plugins/loader/store'
import shipmentsServices from "@/services/modules/shipments/shipmentsServices";

const loader = useLoaderStore();

export const useShipmentsStore = defineStore({
	id: "shipments",
	state: () => ({
		shipments: null
	}),
	actions: {
		getAll() {
			loader.start();
			shipmentsServices
				.getAll()
				.then((results) => this.setAll(results.data.data))
				.finally(() => loader.stop());
		},
		async get(shipmentId) {
			loader.start();

			let shipment = null;

			await shipmentsServices
				.get(shipmentId)
				.then((results) => shipment = results.data.data)
				.finally(() => loader.stop());

			return shipment;
		},
		setAll(shipments) {
			this.shipments = shipments
		},
		async store(shipment) {
			loader.start();

			let results;
			await shipmentsServices
				.store(shipment)
				.then(_results => results = _results)
				.finally(() => loader.stop())

			return results
		},
		async update(shipment) {
			loader.start();

			let results;
			await shipmentsServices
				.update(shipment)
				.then(_results => results = _results)
				.finally(() => loader.stop())

			return results
		},
		add(shipment) {
			if (!this.shipments) this.shipments = []

			this.shipments.unshift(shipment)
		},
		async delete(shipmentId) {
			loader.start();
			
			let results;
			await shipmentsServices
				.delete(shipmentId)
				.then(_results => results = _results)
				.finally(() => loader.stop());
			return results
		},
	},
});
