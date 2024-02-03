export default defineCachedEventHandler(async (event) => {
    // ambil alamat server bakcend
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;

    // ambil query.page
    const { page } = getQuery(event);

    // ambil data projects dari backend express
    try {
        return await $fetch(`${apiUri}/projects?limit=9&page=${page}`)
    } catch (error) {
        throw error;
    }
});