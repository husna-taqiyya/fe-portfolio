import { defineStore } from "pinia";
// import { useApiStore } from "./apiStore";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null
    }),
    actions: {
        async get() {
            const Api = useApiStore();

            this.profile = await Api.get('/profile');
        },
        async update(data) {
            const Api = useApiStore();

            // validate
            data = Validate(isUpdateProfile, data);

            this.profile = await Api.put('/profile', data);
        }
    }
});