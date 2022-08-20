<template>
    <button
        :type="type"
        class="
            inline-block
            px-6
            py-2.5
            bg-primary
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-primary-hover hover:shadow-lg
            focus:bg-primary-hover focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out
        "
    >
        {{ text }}
    </button>
</template>

<script setup>
    const props = defineProps({
        text: String,
        type: String,
    });
</script>