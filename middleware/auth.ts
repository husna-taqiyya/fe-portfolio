export default defineNuxtRouteMiddleware(async (to, from) => {
    const AuthStore = useAuthStore();

    // CHECK TOKEN DI COOKIES
    const token = useCookie('token');

    if (to.path !== '/admin/login') {
        // bukan halaman login

        // check token
        if (!token.value) {
            return navigateTo('/admin/login');
        }

        // kondisi token ada
        if (!AuthStore.user) {
            // fetch data user
            await AuthStore.getUser();
        }
    }


    // CHECK USER DATA
});