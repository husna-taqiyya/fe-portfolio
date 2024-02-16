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
        },
        // POST
        async post(path, data) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            const jsonData = JSON.stringify(data);

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'POST',
                    body: jsonData,
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                // RETURN DATA  

                return data
            } catch (error) {
                console.log('error');
                console.log(error);
            }
        },
        // PUT
        // PATCH
        // DELETE
        async delete(path) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            try {
                const data = await $fetch(apiUri + path, {
                    method: 'DELETE',
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
    }
});