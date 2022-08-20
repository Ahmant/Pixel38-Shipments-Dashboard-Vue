<template>
    <li class="sidebar__item">
        <router-link
            :to="{ name: props.item.route_name }"
            class="flex items-center p-3 text-lg rounded-lg my-1"
            :class="{
                'bg-primary text-white hover:bg-primary-hover': isActive,
                'text-base-color hover:bg-gray-100': !isActive,
            }"
        >
            <i :class="`${props.item.icon} w-7 h-7 sidebar__item__icon`"></i>

            <span class="ml-3 sidebar__item__text">{{ props.item.text }}</span>
        </router-link>
    </li>
</template>

<script setup>
    import { defineProps, onMounted, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    const props = defineProps({
        item: null,
    });

    const isActive = ref(false);

    const route = useRoute();
    const router = useRouter();
    watch(route, checkActiveItem);
    onMounted(async () => {
        await router.isReady();
        checkActiveItem();
    });

	function checkActiveItem() {
        isActive.value = false;
        (route.matched || []).some(_route => {
            if (!_route.name) return false;
            
            let routeToLevel = _route.name.split('.')[0]
            isActive.value = routeToLevel == props.item.route_name
        });
	}
</script>

<style>
    .sidebar__item__text {
        transition: 0.4s;
    }
    .sidebar.closed .sidebar__item__text {
        opacity: 0;
    }
</style>