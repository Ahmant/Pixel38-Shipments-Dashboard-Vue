<template>
    <div class="fixed top-0 right-0 m-2" style="z-index: 99999">
        <transition-group name="list">
            <notification-item
                v-for="(notification, key) in notifications"
                :key="key"
                :title="notification.title"
                :body="notification.body"
                :type="notification.type"
            />
        </transition-group>
    </div>
</template>

<script setup>
    import NotificationItem from "./NotificationItem.vue";
    import { useNotificationsStore } from "@/plugins/notifications/store";
    import { storeToRefs } from "pinia";

    const notificationsStore = useNotificationsStore();
    const { notifications } = storeToRefs(notificationsStore);
</script>

<style scoped>
    .list-enter-from {
        opacity: 0;
        transform: scale(0.6);
    }
    .list-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    .list-enter-active {
        transition: all 0.4s ease;
    }

    .list-leave-from {
        opacity: 1;
        transform: scale(1);
    }
    .list-leave-to {
        opacity: 0;
        transform: scale(0.6);
    }

    .list-leave-active {
        transition: all 0.4s ease;
    }

    .list-move {
        transition: all 0.3s ease;
    }
</style>