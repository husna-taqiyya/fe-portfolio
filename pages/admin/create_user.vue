<template>
    <!--Max screen h screen overflow supaya tidak ada scrolling atas bawah, kanan kiri-->
    <div class="w-screen h-screen max-h-screen max-w-screen overflow-hidden bg-white">
        <div class="h-full w-full grid max-lg:grid-rows-10 lg:grid-cols-2">
            <div class="max-lg:row-span-4 flex flex-col justify-center items-center">
                <ImagesProgrammer class="w-[125%]" />
            </div>
            <div
                class="max-lg:row-span-6 bg-[#EDD6D6] text-black flex flex-col gap-6 lg:gap-12 justify-center items-center px-10 md:px-28 lg:px-20 xl:px-40">
                <!--NAMA-->
                <div class="font-bungee-shade text-nowrap text-3xl md:text-6xl lg:text-4xl xl:text-6xl">Create User
                </div>

                <div class="flex flex-col gap-4">
                    <!--input nama-->
                    <div class="w-full font-arc-daughter text-xl md:text-2xl">
                        <label>Nama</label>
                        <input v-model="formData.name" type="text" placeholder="name" class="input w-full bg-[#bfc5c5]">
                        <div class="text-error text-sm text-right mr-2" v-if="errorMessage.name">{{ errorMessage.name }}
                        </div>
                    </div>

                    <!--input Email-->
                    <div class="w-full font-arc-daughter text-xl md:text-2xl">
                        <label>Email</label>
                        <input v-model="formData.email" type="text" placeholder="Email"
                            class="input w-full bg-[#bfc5c5]">
                        <div class="text-error text-sm text-right mr-2" v-if="errorMessage.email">{{ errorMessage.email
                            }}
                        </div>
                    </div>

                    <!--input Password-->
                    <div class="w-full font-arc-daughter text-xl md:text-2xl">
                        <label>Password</label>
                        <input v-model="formData.password" type="password" placeholder="Password"
                            class="input w-full bg-[#bfc5c5]">
                        <div class="text-error text-sm text-right mr-2" v-if="errorMessage.password">{{
                            errorMessage.password }}
                        </div>
                    </div>

                    <!--input confirm Password-->
                    <div class="w-full font-arc-daughter text-xl md:text-2xl">
                        <label>Confirm Password</label>
                        <input v-model="formData.confirm_password" type="password" placeholder="confirm_Password"
                            class="input w-full bg-[#bfc5c5]">
                        <div class="text-error text-sm text-right mr-2" v-if="errorMessage.confirm_password">{{
                            errorMessage.confirm_password }}
                        </div>
                    </div>
                </div>

                <button @click="handleLogin"
                    class="font-baloo-bhai text-black btn border-0 text-xl md:text-2xl bg-[#bfc5c5] p-10 md:px-20 lg:px-32 py-0 md:py-2 h-min text-nowrap">
                    REGISTER
                    <ImagesLoading class="w-12" v-if="isLoading" />
                </button>
                <div class="text-error text-sm text-right mr-2">{{ fetchError }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Joi from 'joi';

definePageMeta({
    layout: false,
    middleware: [async () => {
        console.log('ini middleware');
        const AuthStore = useAuthStore();
        const isExist = await AuthStore.isUserExist();

        if (isExist) {
            return navigateTo('/admin/login');
        }
    }]
});

const formData = ref({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
});

// Auth state / pinia
const AuthStore = useAuthStore();

const errorMessage = ref({});
const fetchError = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
    // halangi jika sedang login
    if (isLoading.value) return;

    // reset error messages
    errorMessage.value = {};
    fetchError.value = '';

    isLoading.value = true;
    try {
        // fetch login
        await AuthStore.createFirstUser(formData.value)
        // berhasil login

        navigateTo('/admin/login');
    } catch (error) {

        if (error instanceof Joi.ValidationError) {
            errorMessage.value = joiError(error);
        } else {
            fetchError.value = error.data.message;
        }

        isLoading.value = false;

    }
}
</script>