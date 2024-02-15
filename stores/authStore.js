import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({

    }),
    actions: {
        login() {
            // handle login
            console.log('handle login')
        },
        logout() {
            // handle logout
            console.log('handle logout')
        },

    }
})