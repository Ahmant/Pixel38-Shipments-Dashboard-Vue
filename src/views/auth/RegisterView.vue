<template>
    <div class="w-screen min-h-screen flex justify-center items-center p-4">
        <card-base title="Register" title-alignment="center" class="w-112 my-4">
            <form @submit="submit">
                <input-base label="First Name" required v-model:value="form.first_name" />
                <input-base label="Last Name" required v-model:value="form.last_name" />
                <input-base label="Email" type="email" required v-model:value="form.email" />
                <input-base label="Password" type="password" required v-model:value="form.password" />
                <input-base
                    label="Confirm Password"
                    type="password"
                    required
                    v-model:value="form.password_confirmation"
                />

                <router-link :to="{ name: 'auth.login' }" class="text-sm">Already have an acccount?</router-link>

                <div class="text-center mt-3">
                    <button-base text="REGISTER" type="sybmit" />
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
    import { useUserStore } from "../../stores/core/user";
import { useRouter } from "vue-router";

    const router = useRouter();
    const loader = useLoaderStore();
    const notificationsStore = useNotificationsStore();

    const form = ref({
        first_name: "Ahmad",
        last_name: "Antar",
        email: "ahmadant98@gmail.com",
        password: "12345678",
        password_confirmation: "12345678",
    });

    function submit(event) {
        event.preventDefault();

        loader.start();

        AuthServices.register(form.value)
            .then((results) => {
                notificationsStore.notify("success", results.data.message);

                let data = results.data.data;
                router.push({ name: "auth.verify-email", params: { userId: data.user_id } });
            })
            .finally(() => {
                loader.stop();
            });
    }
</script>

