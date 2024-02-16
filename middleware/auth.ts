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

            // kalo error, atau data tetap null balik ke halaman login

            if (!AuthStore.user) {
                // clear cookies, prevent infinite loading
                token.value = '';

                return navigateTo('/admin/login');
            }
        }
    } else {
        // ke halaman login

        // check token, kalau ada return ke halaman index
        if (token.value) {
            return navigateTo('/admin');
        }
    }


    // CHECK USER DATA
});