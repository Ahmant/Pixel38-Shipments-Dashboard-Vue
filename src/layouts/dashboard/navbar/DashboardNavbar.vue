<template>
    <div class="navbar">
        <div class="flex rounded-lg px-4 shadow-lg bg-white w-full h-full items-center justify-between">
            <div>
                <span @click="sidebar.toggle" class="hidden md:inline-block">
                    <i class="fa-solid fa-bars text-xl cursor-pointer"></i>
                </span>
                <span class="ml-4 text-lg">{{ title }}</span>
            </div>
            <div class="relative">
                <dropdown-base :options="avatarActions" class="hidden md:block">
                    <avatar-base :img="AvatarImage" />
                </dropdown-base>
                <span @click="sidebar.toggle" class="inline-block md:hidden">
                    <i class="fa-solid fa-bars text-xl cursor-pointer"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from "@vue/runtime-core";
    import { useRoute, useRouter } from "vue-router";
    import AvatarBase from "../../../components/partials/AvatarBase.vue";
    import DropdownBase from "../../../components/partials/DropdownBase.vue";
    import { useNotificationsStore } from "../../../plugins/notifications/store";
    import { useUserStore } from "@/stores/core/user";
    import { useSidebarStore } from "@/stores/core/sidebar";
    import AvatarImage from "@/assets/images/avatar.png";

    const route = useRoute();
    const router = useRouter();
    const notificationsStore = useNotificationsStore();
    const sidebar = useSidebarStore();

    const title = computed(() => {
        if (!route) return "";
        return route.meta.title;
    });

    const avatarActions = [
        {
            label: "Logout",
            key: "logout",
            icon: "fa-solid fa-arrow-right-from-bracket",
            type: "button",
            onClick: () => logout(),
        },
    ];

    const user = useUserStore();
    function logout() {
        user.logout();

        if (!localStorage.getItem("auth_token")) {
            notificationsStore.notify("success", "You logged out");
            router.push({ name: "auth.login" });
        }
    }
</script>


<style>
    .navbar {
        height: 50px;
    }
</style>