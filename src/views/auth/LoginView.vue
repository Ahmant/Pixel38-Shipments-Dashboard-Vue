<template>
    <div class="w-screen min-h-screen flex justify-center items-center p-4">
        <card-base title="Login" title-alignment="center" class="w-112 my-4">
            <form @submit="submit">
                <input-base label="Email" type="email" required v-model:value="form.email" />
                <input-base label="Password" type="password" required v-model:value="form.password" />

                <router-link :to="{ name: 'auth.register' }" class="text-sm">New? Create an account today</router-link>

                <div class="text-center mt-3">
                    <button-base text="LOGIN" />
                </div>
            </form>
        </card-base>
    </div>
</template>

<script setup>
    import CardBase from "../../components/partials/CardBase.vue";
    import InputBase from "../../components/form/InputBase.vue";
    import ButtonBase from "../../components/form/ButtonBase.vue";
    import { useLoaderStore } from "../../plugins/loader/store";
    import { useNotificationsStore } from "../../plugins/notifications/store";
    import AuthServices from "@/services/modules/auth/authServices.js";
    import { ref } from "@vue/reactivity";
    import { useUserStore } from "../../stores/core/user.js";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const loader = useLoaderStore();
    const userStore = useUserStore();
    const notificationsStore = useNotificationsStore();

    const form = ref({
        email: "",
        password: "",
        device_name: "browser",
    });

    function submit(event) {
        event.preventDefault();

        loader.start();

        AuthServices.createSession().then(() => {
            AuthServices.login(form.value)
                .then((results) => {
                    notificationsStore.notify("success", results.data.message);

                    let data = results.data.data;
                    localStorage.setItem("auth_token", data.token);
                    router.push({ name: "dashboard" });
                })
                .catch((error) => {
                    if (!error.response || !error.response.data) return;

                    let data = error.response.data;
                    if (data.key == "email_verification") {
                        router.push({ name: "auth.verify-email", params: { userId: data.data.user_id } });
                    }
                })
                .finally(() => loader.stop());
        });
    }
</script>

