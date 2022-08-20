<template>
    <the-loader />
    <notifications-list />

    <router-view/>
</template>

<script setup>
    import { onMounted, ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import TheLoader from "./plugins/loader/components/TheLoader.vue";
    import NotificationsList from "@/plugins/notifications/components/NotificationsList.vue";

    const route = useRoute();

    watch(route, () => {
        // * When moving from route to another, and due to the "transition/animation" a vertical scrollbar appears
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        setTimeout(() => {
            document.getElementsByTagName("body")[0].style.overflowY = "auto";
        }, 500); // 500ms until the transition is done
    });

    onMounted(() => {
        // localStorage.setItem(
        //     "spotify_authorization_base64",
        //     "Basic " +
        //         Buffer.from(
        //             process.env.VUE_APP_SPOTIFY_CLIENT_ID + ":" + process.env.VUE_APP_SPOTIFY_CLIENT_SECRET,
        //             "utf-8"
        //         ).toString("base64")
        // );
    });
</script>


<!--
    ✅ Responsive


    ✅ Logo for mobile
    ✅ Logo for desktop
    ✅ page title in the navbar
    ✅ Sidebar toggle using pinia
    ✅ avatar
    ✅ avatar collapse -> logout
    ✅ auth
        ✅ login
        ✅ logout
        ✅ register
        ✅ email verification
        ✅ email verification success handle
        ✅ email verification expired handle
    ✅ dashboard statistics
    ✅ shipments
        ✅ create
        ✅ index
        ✅ edit
        ✅ delete
            ✅ confirmation modal
    ✅ success toast
    ✅ error toast

    ❌ Documentation - Backend
    ❌ Documentation - Frontend
    
    ❌ Naming conventions
        ❌ components
-->