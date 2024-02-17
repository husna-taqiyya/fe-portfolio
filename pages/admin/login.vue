<template>
    <!-- max screen h overflow supaya tidak ada scrolling atas bawah dan kanan kiri -->
    <div class="w-screen h-screen max-h-screen max-w-screen overflow-hidden bg-white">
        <!-- max lg -> rows 2 -->
        <!-- min lg -> cols 2 -->
        <div class="h-full w-full grid max-lg:grid-rows-10 lg:grid-cols-2">
            <div class="max-lg:row-span-4 flex flex-col justify-center items-center">
                <ImagesProgrammer class="w-[125%]" />
            </div>
            <div
                class="max-lg:row-span-6 bg-[#EDD6D6] flex flex-col gap-6 lg:gap-12 justify-center items-center px-10 lg:px-32">
                <!-- nama -->
                <div class="font-bungee-shade text-nowrap text-3xl md:text-6xl lg:text-4xl xl:text-6xl">{{ fullname }}</div>

                <!-- input email -->
                <div class="w-full font-arc-daughter text-xl md:text-2xl">
                    <label>Email</label>
                    <input v-model="formData.email" type="text" placeholder="Email" class="input w-full bg-[#D3C7C7]">
                    <div class="text-error text-sm text-right mr-2" v-if="errorMessages.email">{{ errorMessages.email }}
                    </div>
                </div>

                <!-- input password -->
                <div class="w-full font-arc-daughter text-xl md:text-2xl">
                    <label>Password</label>
                    <input v-model="formData.password" type="password" placeholder="Password"
                        class="input w-full bg-[#D3C7C7]">

                    <!-- error massage -->
                    <div class="text-error text-sm text-right mr-2" v-if="errorMessages.password">{{
                        errorMessages.password }}
                    </div>
                </div>

                <!-- login button -->
                <div class="flex gap-4">
                    <button @click="handleLogin"
                        class="font-baloo-bhai btn border-0 text-xl md:text-2xl bg-[#D3C7C7] p-10 md:px-20 py-0 lg:px-32 md:py-2 h-min text-nowrap">
                        LOGIN NOW
                        <ImagesLoading class="w-10" v-if="isLoading" />
                    </button>
                </div>
                <div v-if="isLoading">Loading...</div>

                <div class="text-error text-sm text-right mr-2">{{ fetchError }}</div>

            </div>
        </div>
    </div>
</template>

<script setup>
import Joi from 'joi';
definePageMeta({
    layout: false,
    middleware: ['profile', 'auth']
});

const { value: useProfile } = useState('profile');
const fullname = `${useProfile.firstname} ${useProfile.lastname}`;

const formData = ref({
    email: '',
    password: ''
});

// AUTH STATE / PINIA
const AuthStore = useAuthStore();

const errorMessages = ref({});
const fetchError = ref('');
const isLoading = ref(false);
const handleLogin = async () => {
    // di halangi jika sedang loading
    if (isLoading.value) return;

    // reset error massages
    errorMessages.value = {};
    fetchError.value = '';

    isLoading.value = true;
    try {
        // fetch login
        await AuthStore.login(formData.value);
        // berhasil login
    } catch (error) {

        if (error instanceof Joi.ValidationError) {
            errorMessages.value = joierror(error);
        } else {
            fetchError.value = error.data.message;
        }

        isLoading.value = false;
    }
}

</script>