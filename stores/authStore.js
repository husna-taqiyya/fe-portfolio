import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    actions: {
        async login(data) {
            const Api = useApiStore();

            // isi state user
            this.user = await Api.post('/login', data);

            // redirect ke halaman admin
            navigateTo('/admin');
        },
        async logout() {
            const Api = useApiStore();
            this.user = await Api.get('/user');

            // redirect ke home halaman login
            navigateTo('/admin/login');
        },
        async getUser() {
            const Api = useApiStore();

            // fetch data using Api method
            // return data, di taro ke state
            this.user = await Api.get('/user');

        }
    }
})