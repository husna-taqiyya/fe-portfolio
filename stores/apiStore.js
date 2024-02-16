import { defineStore } from "pinia";

export const useApiStore = defineStore('api', {
    state: () => ({
        data: null
    }),
    actions: {
        // get
        async get(path) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                // RETURN DATA

                return data
            } catch (error) {
                console.log('error');
                console.log(error);
            }
        }
        // POST
        // PUT
        // PATCH
        // DELETE
    }
});