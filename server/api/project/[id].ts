export default defineEventHandler(async (event) => {
    // ambil id berdasarkan parameter
    const id = getRouterParam(event, 'id');

    // ambil alamat server backend
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;

    // ambil data dari beckend project by id
    try {
        return await $fetch(`${apiUri}/project/${id}`);
    } catch (error) {
        // lempar error
        throw error;
    }
});