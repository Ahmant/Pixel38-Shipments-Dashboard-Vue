<template>
    <card-base class="w-full">
        <form @submit="submit">
            <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
                <input-base label="Customer Name" v-model:value="shipment.customer_name" required></input-base>
                <input-base
                    label="Customer Phone Number"
                    v-model:value="shipment.customer_phone_number"
                    required
                ></input-base>
            </div>
            <div class="grid gap-4 grid-cols-1">
                <textarea-base
                    label="Customer Address"
                    v-model:value="shipment.customer_address"
                    required
                ></textarea-base>
                <textarea-base label="Waybill" v-model:value="shipment.waybill" required></textarea-base>
            </div>
            <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                <select-base :options="statusOptions" v-model:value="shipment.status" required />
            </div>

            <div class="text-right">
                <button class="bg-primary text-white rounded px-2 py-1 mt-2">Save</button>
            </div>
        </form>
    </card-base>
</template>

<script setup>
    import SelectBase from "../../../components/form/SelectBase.vue";
    import InputBase from "../../../components/form/InputBase.vue";
    import TextareaBase from "../../../components/form/TextareaBase.vue";
    import CardBase from "../../../components/partials/CardBase.vue";
    import { ref } from "@vue/reactivity";
    import { useShipmentsStore } from "@/stores/shipments/shipments.js";
    import { onBeforeMount, onMounted } from "@vue/runtime-core";
    import { useRoute, useRouter } from "vue-router";
    import { useNotificationsStore } from "../../../plugins/notifications/store";

    const shipmentsStore = useShipmentsStore();
    const notificationsStore = useNotificationsStore();
    const route = useRoute();
    const router = useRouter();

    const statusOptions = [
        {
            label: "Completed",
            key: "completed",
        },
        {
            label: "Pending",
            key: "pending",
        },
        {
            label: "On Delivery",
            key: "on_delivery",
        },
        {
            label: "Draft",
            key: "draft",
        },
    ];

    onBeforeMount(() => {
        getShipment();
    });

    const shipment = ref({
        customer_name: null,
        customer_phone_number: null,
        customer_address: null,
        waybill: null,
        status: null,
    });

    async function getShipment() {
        const shipmentId = route.params.id;
        if (!shipmentId) return;

        shipment.value = await shipmentsStore.get(shipmentId);
    }

    function submit(e) {
        e.preventDefault();
        if (!shipment.value) return;

        if (shipment.value.id) {
            shipmentsStore
                .update({ ...shipment.value })
                .then((results) => notificationsStore.notify("success", results.data.message));
        } else {
            shipmentsStore.store({ ...shipment.value }).then((results) => {
                router.push({ name: "shipments" });
                notificationsStore.notify("success", results.data.message);
            });
        }
    }
</script>