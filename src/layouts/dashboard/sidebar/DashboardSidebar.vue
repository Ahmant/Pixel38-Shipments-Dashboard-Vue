<template>
    <div :class="[sidebar.isOpen ? 'w-screen' : 'w-0', 'backdrop fixed  h-screen bg-black bg-opacity-30 z-100 md:hidden']" @click="sidebar.toggle"></div>
    <div :class="[sidebar.isOpen ? 'open' : 'closed', 'sidebar shadow-lg fixed md:relative z-100']">
        <div class="block p-3 rounded-lg bg-white w-full h-full">
            <div class="w-full h-10 flex justify-center items-center">
                <img v-if="sidebar.isOpen" src="@/assets/images/logo.png" class="px-3" />
                <img v-else src="@/assets/images/logo_closed.png" class="px-3" />
            </div>
            <ul class="mt-6">
                <dashboard-sidebar-list-item v-for="(item, index) in items" :key="index" :item="item" />
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { useSidebarStore } from "../../../stores/core/sidebar";
    import DashboardSidebarListItem from "./DashboardSidebarListItem.vue";

    const sidebar = useSidebarStore();

    const items = [
        {
            icon: "fa-solid fa-gauge-high",
            text: "Dashboard",
            route_name: "dashboard",
        },
        {
            icon: "fa-solid fa-box",
            text: "Shipments",
            route_name: "shipments",
        },
    ];
</script>


<style>
    .sidebar {
        margin: 0.5rem;
        height: calc(100vh - 0.5rem * 2);
        overflow-x: hidden;
        transition: 0.4s;
    }
    .sidebar.open {
        width: 250px;
    }

    .sidebar.closed {
        width: 74px;
    }

    @media only screen and (max-width: 767px) {
        .sidebar.closed {
            width: 0px;
        }
    }
</style>