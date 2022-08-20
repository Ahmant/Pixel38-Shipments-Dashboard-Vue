<template>
    <div class="flex justify-center">
        <div class="flex p-6 rounded-lg shadow-lg bg-white w-full justify-between">
            <div>
                <h6 v-if="props.title" class="text-gray-900 text-base leading-tight font-medium mb-2">
                    {{ props.title }}
                </h6>
                <h5 v-if="props.number" class="text-gray-900 text-xl leading-tight font-semibold mb-2">
                    {{ props.number }}
                </h5>
                <slot></slot>
            </div>

            <div class="flex justify-center items-center">
                <div
                    v-if="props.icon"
                    :class="`${props.iconBackgroundClass} ${iconColorClass} w-10 h-10 rounded flex justify-center items-center text-xl`"
                >
                    <i :class="props.icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        icon: null,
        iconBackgroundClass: {
            type: String,
            default: "bg-primary",
        },
        iconColorClass: {
            type: String,
            default: "text-white",
        },
        title: null,
        number: null,
    });
</script>