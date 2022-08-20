<template>
    <div :class="[getColorClass(), 'px-3 py-1 rounded-lg text-white text-center w-max']">
        <b>{{ text }}</b>
    </div>
</template>

<script setup>
    const props = defineProps({
        text: String,
        type: String,
    });

    function getColorClass() {
        let colorClass = "";
        switch (props.type) {
            case "success":
                colorClass = "bg-green-500";
                break;
            case "error":
                colorClass = "bg-red-500";
                break;
            case "warning":
                colorClass = "bg-amber-500";
                break;
            case "info":
                colorClass = "bg-sky-500";
                break;
            default:
                colorClass = "bg-gray-500";
                break;
        }

		return colorClass;
    }
</script>
