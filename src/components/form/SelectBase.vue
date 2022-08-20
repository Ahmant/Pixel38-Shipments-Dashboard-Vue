<template>
    <Listbox v-model="selectedOptionKey">
        <div class="relative mt-1 z-100">
            <ListboxButton
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
                    text-left
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
            >
                <span class="block truncate">{{ selectedOption ? selectedOption.label : 'Nothing Selected' }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <i class="fa-solid fa-chevron-down h-4 w-4 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <ListboxOptions
                    class="
                        absolute
                        mt-1
                        max-h-60
                        w-full
                        overflow-auto
                        rounded-md
                        bg-white
                        py-1
                        text-base
                        shadow-lg
                        ring-1 ring-black ring-opacity-5
                        focus:outline-none
                        sm:text-sm
                    "
                >
                    <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="option in options"
                        :key="option.key"
                        :value="option.key"
                        as="template"
                    >
                        <li
                            :class="[
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]"
                        >
                            <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                                option.label
                            }}</span>
                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                            >
                                <i class="fa-solid fa-check h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup>
    import { ref, watch, computed } from "vue";
    import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";
    import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

    const props = defineProps({
        options: Object,
        value: String,
    });

    const selectedOptionKey = ref(null);
    const selectedOption = computed(() =>
        (props.options || []).find((option) => option.key && option.key == selectedOptionKey.value)
    );

    const emits = defineEmits(["update:value"]);

    watch(
        () => selectedOptionKey.value,
        () => emits("update:value", selectedOptionKey.value)
    );

    watch(
        () => props.value,
        () => selectedOptionKey.value = props.value,
        { immediate: true }
    );
</script>