import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        profile: null
    }),
    actions: {
        async get() {
            const Api = useApiStore();

            this.profile = await Api.get('/profile');
        },
        async update(data, avatar) {
            const Api = useApiStore();

            // validate
            data = Validate(isUpdateProfile, data);

            // CARA YANG PERTAMA
            const formData = new FormData();
            for (let [key, value] of Object.entries(data)) {
                console.log('key - >' + key)
                console.log('value - >' + value)

                // append to formData
                // tidak boleh taro data selain string
                if (value == null) {
                    value = '';
                }
                formData.append(key, value);
            }

            formData.append('avatar', avatar);

            this.profile = await Api.put('/profile', formData);
        },

        async update2(data, avatar) {
            const Api = useApiStore();

            // validate
            data = Validate(isUpdateProfile, data);

            if (avatar) {
                const formData = new FormData();
                formData.append('avatar', avatar);

                this.profile = await Api.put('/profile', formData);
            }
        }
    }
}); 