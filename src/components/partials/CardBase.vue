<template>
    <div class="flex justify-center">
        <div class="block p-6 rounded-lg shadow-lg bg-white w-full">
            <h5
                v-if="props.title"
                class="text-gray-900 text-xl leading-tight font-medium mb-2"
                :class="'text-' + props.titleAlignment"
            >
                {{ props.title }}
            </h5>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        title: null,
        titleAlignment: null,
    });
</script>