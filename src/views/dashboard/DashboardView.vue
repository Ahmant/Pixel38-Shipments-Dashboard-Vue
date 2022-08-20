<template>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <card-icon-statistics
            v-for="(statistic, index) in statistics"
            :key="index"
            :icon="statistic.icon"
            :icon-background-class="statistic.iconBackgroundClass"
            :title="statistic.title"
            :number="statistic.count"
        />
    </div>
</template>

<script setup>
    import { onMounted, ref } from "@vue/runtime-core";
    import CardIconStatistics from "../../components/partials/CardIconStatistics.vue";
    import { useLoaderStore } from "../../plugins/loader/store";
    import shipmentsServices from "../../services/modules/shipments/shipmentsServices";

    const loader = useLoaderStore();

    const statistics = ref({
        pending: {
            icon: "fa-solid fa-clock",
            iconBackgroundClass: "bg-amber-400",
            count: "0",
            title: "Pending",
        },
        completed: {
            icon: "fa-solid fa-check",
            iconBackgroundClass: "bg-green-500",
            count: "0",
            title: "Completed",
        },
        on_delivery: {
            icon: "fa-solid fa-truck",
            iconBackgroundClass: "bg-sky-500",
            count: "0",
            title: "On Delivery",
        },
        draft: {
            icon: "fa-solid fa-pen-ruler",
            iconBackgroundClass: "bg-gray-500",
            count: "0",
            title: "Draft",
        },
    });

    onMounted(getStatistics);

    function getStatistics() {
        loader.start();
        shipmentsServices
            .countByStatus()
            .then((results) => {
                Object.entries(results.data.data || {}).forEach(([key, count]) => {
                    if (!statistics.value[key]) return;

                    statistics.value[key].count = count;
                });
            })
            .finally(() => loader.stop());
    }
</script>