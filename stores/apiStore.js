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
                const response = await $fetch(apiUri + path, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                // RETURN DATA  
                return response
            } catch (error) {
                this.handleError(error);
            }
        },
        // POST
        async post(path, data) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            if (!(data instanceof FormData)) {
                // jika data bukan form data
                data = JSON.stringify(data);
            }

            try {
                const response = await $fetch(apiUri + path, {
                    method: 'POST',
                    body: data,
                    credentials: 'include'
                });

                // RETURN DATA  
                return response
            } catch (error) {
                this.handleError(error);
            }
        },
        // PUT
        async put(path, data) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            if (!data instanceof FormData) {
                // jika databukan formdata
                data = JSON.stringify(data);
            }
            try {
                console.log("masuk API")
                const response = await $fetch(apiUri + path, {
                    method: "PUT",
                    body: data,
                    credentials: 'include'
                });

                // RETURN DATA  
                return response
            } catch (error) {
                console.log(error)
                this.handleError(error);
            }
        },
        // PATCH
        async patch(path, data) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            const jsonData = JSON.stringify(data);

            try {
                const response = await $fetch(apiUri + path, {
                    method: 'PATCH',
                    body: jsonData,
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                // RETURN DATA  
                return response
            } catch (error) {
                this.handleError(error);
            }
        },
        // DELETE
        async delete(path) {
            const config = useRuntimeConfig();
            const apiUri = config.public.apiUri;

            try {
                const response = await $fetch(apiUri + path, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                // RETURN DATA  
                return response
            } catch (error) {
                this.handleError(error);
            }
        },
        handleError(error) {
            // 401 UNAUTHORIZED / BELUM LOGIN
            if (error.status == 401) {
                // hapus token dari cookie
                const token = useCookie('token');
                token.value = '';

                // lempar ke halaman login
                return navigateTo('/admin/login');
            }

            // 400 BAD REQUEST
            if (error.status == 400) {
                throw error;
            }

            // selain 401 & 400
            throw createError({
                statusCode: error.status || 500, // <- default code 500
                statusMessage: error.message || 'Internal Server Error!' // <- default massage
            });
        }
    }
});