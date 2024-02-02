export default defineCachedEventHandler(async (event) => {
    // INI menghandle SSR
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;
    console.log(config);
    try {
        return await $fetch(apiUri + '/portfolio');
    } catch (error) {
        throw error;
    }

})