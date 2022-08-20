<template>
    <div class="flex justify-center">
        <div class="flex p-6 rounded-lg shadow-lg bg-white w-full justify-between">
            <div>
                <h6 v-if="title" class="text-gray-900 text-base leading-tight font-medium mb-2">
                    {{ title }}
                </h6>
                <h5 v-if="number" class="text-gray-900 text-xl leading-tight font-semibold mb-2">
                    {{ number }}
                </h5>
                <slot></slot>
            </div>

            <div class="flex justify-center items-center">
                <div
                    v-if="icon"
                    :class="`${iconBackgroundClass} ${iconColorClass} w-10 h-10 rounded flex justify-center items-center text-xl`"
                >
                    <i :class="icon"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
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