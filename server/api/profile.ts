export default defineCachedEventHandler(async (event) => {
    // INI menghandle SSR
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;
    try {
        return await $fetch(apiUri + '/profile');
    } catch (error) {
        throw error;
    }
});