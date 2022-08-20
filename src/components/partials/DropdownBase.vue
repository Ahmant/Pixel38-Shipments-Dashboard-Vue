<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="
                    inline-flex
                    w-full
                    justify-center
                    px-2
                    py-2
                    text-sm
                    font-medium
                    focus:outline-none
                "
            >
                <slot></slot>
            </MenuButton>
        </div>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
                class="
                    absolute
                    right-0
                    mt-2
                    w-56
                    origin-top-right
                    divide-y divide-gray-100
                    rounded-md
                    bg-white
                    shadow-lg
                    ring-1 ring-black ring-opacity-5
                    focus:outline-none
                    z-100
                "
            >
                <div class="px-1 py-1">
                    <MenuItem v-for="(option, index) in props.options" :key="index" as="div">
                        <component :is="renderOption(option)"></component>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>


<script setup>
    import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
    import { defineProps, h, resolveComponent } from "vue";

    const props = defineProps({
        options: {
            type: Object,
        },
    });

    function renderOption(option) {
        return () =>
            h(
                option.type == "link" ? resolveComponent("router-link") : "button",
                {
                    to: option.to,
                    onClick: option.onClick,
                    class: "text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm",
                },
                [
                    h("i", {
                        class: [option.icon, "mr-2 h-5 w-5 text-violet-400"],
                    }),
                    option.label,
                ]
            );
    }
</script>
