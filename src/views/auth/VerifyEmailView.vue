<template>
    <div class="w-screen min-h-screen flex justify-center items-center">
        <card-base title="Verify" title-alignment="center" class="w-112 my-4">
            <p class="text-center">
                Kindly enter the <u><b>code</b></u> sent to you via email
            </p>
            <form @submit="verifyEmail">
                <input-base class="mt-2" placeholder="Enter code here" v-model:value="verificationCode" required />

                <div class="mt-2 text-center">
                    <button-base text="Verify"></button-base>
                </div>
            </form>
        </card-base>
    </div>
</template>

<script setup>
    import CardBase from "../../components/partials/CardBase.vue";
    import InputBase from "../../components/form/InputBase.vue";
    import ButtonBase from "../../components/form/ButtonBase.vue";
    import { ref } from "@vue/reactivity";
    import { useLoaderStore } from "@/plugins/loader/store";
    import AuthServices from "@/services/modules/auth/authServices.js";
    import { useNotificationsStore } from "../../plugins/notifications/store";
    import { useRoute, useRouter } from "vue-router";

    const loader = useLoaderStore();
    const notificationsStore = useNotificationsStore();
    const route = useRoute();
    const router = useRouter();

    const verificationCode = ref(null);

    function verifyEmail(e) {
        e.preventDefault();

        loader.start();

        const userId = route.params.userId;
        AuthServices.verifyEmail(userId, verificationCode.value)
            .then((response) => {
                notificationsStore.notify("success", response.data.message);
                router.push({ name: "auth.login" });
            })
            .finally(() => loader.stop());
    }
</script>

