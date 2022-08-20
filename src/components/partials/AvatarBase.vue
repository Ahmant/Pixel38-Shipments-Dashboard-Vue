<template>
    <div class="flex -space-x-2 overflow-hidden">
        <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" :src="img" />
    </div>
</template>

<script setup>
    const props = defineProps({
        img: String,
    });
</script>