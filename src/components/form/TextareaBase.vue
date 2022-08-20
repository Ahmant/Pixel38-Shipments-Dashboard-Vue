<template>
    <div class="flex justify-center">
        <div class="mb-3 w-full">
            <label v-if="props.label" :for="id" class="form-label inline-block mb-1 text-gray-700">
                {{ props.label }}
            </label>
            <textarea
                :type="type"
                class="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                :value="value"
                :id="id"
                :placeholder="props.placeholder"
                @input="inputHandle"
                :required="required"
            >
            </textarea>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from "vue";

    const props = defineProps({
        text: String,
        label: String,
        placeholder: String,
        type: String,
        required: Boolean,
        value: String,
    });

    const emits = defineEmits(["update:value"]);

    function inputHandle(event) {
        let value = event.target.value;
        emits("update:value", value);
    }
</script>