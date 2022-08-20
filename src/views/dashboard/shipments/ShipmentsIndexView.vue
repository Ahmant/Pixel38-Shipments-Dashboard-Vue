<template>
    <card-base class="w-full relative">
        <table class="min-w-full">
            <thead class="border-b">
                <tr>
                    <th class="text-sm text-center font-medium text-gray-900 text-left">#</th>
                    <th class="text-sm text-center font-medium text-gray-900 text-left">Customer Name</th>
                    <th class="text-sm text-center font-medium text-gray-900 text-left">Customer Phone Number</th>
                    <th class="text-sm text-center font-medium text-gray-900 text-left">Status</th>
                    <th class="text-sm text-center font-medium text-gray-900 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(shipment, index) in shipments" :key="shipment.id">
                    <td class="text-sm text-center text-gray-900 font-light whitespace-nowrap">{{ index + 1 }}</td>
                    <td class="text-sm text-center text-gray-900 font-light whitespace-nowrap">
                        {{ shipment.customer_name }}
                    </td>
                    <td class="text-sm text-center text-gray-900 font-light whitespace-nowrap">
                        {{ shipment.customer_phone_number }}
                    </td>
                    <td class="text-sm text-center text-gray-900 font-light whitespace-nowrap">
                        <component :is="shipment.status" />
                    </td>
                    <td class="text-sm text-center text-gray-900 font-light whitespace-nowrap">
                        <div>
                            <dropdown-base :options="shipment.actions">
                                <i class="fa-solid fa-ellipsis-vertical h-5 w-5" aria-hidden="true" />
                            </dropdown-base>
                        </div>
                    </td>
                </tr>
                <tr v-if="!shipmentsStore.shipments || shipmentsStore.shipments.length == 0">
                    <td colspan="5" class="text-center">Nothing Found</td>
                </tr>
            </tbody>
        </table>

        <div class="absolute -top-3 -right-2">
            <router-link
                :to="{ name: 'shipments.create' }"
                class="flex justify-center items-center bg-primary text-white text-xl rounded-full w-10 h-10"
            >
                <i class="fa-solid fa-plus"></i>
            </router-link>
        </div>
    </card-base>
</template>

<script setup>
    import CardBase from "../../../components/partials/CardBase.vue";
    import BadgeBase from "../../../components/partials/BadgeBase.vue";
    import InputBase from "../../../components/form/InputBase.vue";
    import DropdownBase from "../../../components/partials/DropdownBase.vue";
    import shipmentsServices from "../../../services/modules/shipments/shipmentsServices";
    import { useShipmentsStore } from "../../../stores/shipments/shipments";
    import { computed, h, inject, onMounted } from "@vue/runtime-core";
    import { useLoaderStore } from "../../../plugins/loader/store";
import { useNotificationsStore } from "../../../plugins/notifications/store";

    const loader = useLoaderStore();
    const shipmentsStore = useShipmentsStore();
    const notificationsStore = useNotificationsStore();
    const swal = inject("$swal");

    const shipments = computed(() => {
        let shipments = [];
        (shipmentsStore.shipments || []).forEach((shipment) => {
            let tempShipment = { ...shipment };

            let status = (tempShipment.status || "").replace("_", " ");
            tempShipment["status"] = h(BadgeBase, {
                type: getStatusBadgeType(shipment.status),
                text: status,
                class: "mx-auto",
            });

            tempShipment["actions"] = [
                {
                    label: "Edit",
                    key: "edit",
                    icon: "fa-solid fa-pencil",
                    type: "link",
                    to: { name: "shipments.edit", params: { id: shipment.id } },
                },
                {
                    label: "Delete",
                    key: "delete",
                    icon: "fa-solid fa-trash",
                    type: "button",
                    onClick: () => confirmDelete(shipment.id),
                },
            ];

            shipments.push(tempShipment);
        });

        return shipments;
    });

    onMounted(fetchShipments);

    function fetchShipments() {
        shipmentsStore.getAll();
    }

    function getStatusBadgeType(status) {
        let type = "";
        switch (status) {
            case "completed":
                type = "success";
                break;
            case "pending":
                type = "warning";
                break;
            case "on_delivery":
                type = "info";
                break;
            default:
                type = "bg-gray-500";
                break;
        }

        return type;
    }

    function confirmDelete(shipmentId) {
        swal({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            customClass: {
                confirmButton: "px-4 py-2 mx-2 text-white rounded bg-red-500",
                cancelButton: "px-4 py-2 mx-2 text-white rounded bg-gray-500",
            },
            buttonsStyling: false,
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                shipmentsStore.delete(shipmentId).then((results) => {
                    fetchShipments();
                    notificationsStore.notify("success", results.data.message);
                });
            }
        });
    }
</script>
