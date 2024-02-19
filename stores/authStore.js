import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    actions: {
        async login(data) {
            try {
                const Api = useApiStore();

                // throw jika error
                data = Validate(loginValidation, data);

                // isi state user
                this.user = await Api.post('/login', data);

                // redirect ke halaman admin
                navigateTo('/admin');

            } catch (error) {
                throw error;
            }

        },
        async logout() {
            const Api = useApiStore();
            await Api.delete('/logout');

            // redirect ke home halaman login
            navigateTo('/admin/login');
        },
        async getUser() {
            const Api = useApiStore();

            // fetch data using Api method
            // return data, di taro ke state
            this.user = await Api.get('/user');

        },
        async update(data) {
            console.log('data sebelum validasi')
            console.log(data);

            data = Validate(updateUserValidation, data);

            console.log('data sesudah validasi')
            console.log(data);

            // fetch
            const Api = useApiStore();

            // fetch user update, dan update statenya
            this.user = await Api.put('/user', data);
        }
    }
});