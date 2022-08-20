<template>
    <div class="flex w-screen-no-scrollbar">
        <dashboard-sidebar />

        <div class="h-screen grow" style="margin: 0.5rem;">
            <dashboard-navbar />
            <div class="mt-4">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
    import DashboardSidebar from "../dashboard/sidebar/DashboardSidebar.vue";
    import DashboardNavbar from "../dashboard/navbar/DashboardNavbar.vue";
</script>