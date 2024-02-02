export default defineEventHandler(async (event) => {
    // ambil id berdasarkan parameter
    const id = getRouterParam(event, 'id');

    // ambil alamat server backend
    const config = useRuntimeConfig();
    const apiUri = config.apiUri;

    // ambil data dari beckend blog by id
    try {
        return await $fetch(`${apiUri}/blog/${id}`);
        // return await $fetch(apiUri + '/blog' + id);
    } catch (error) {
        // lempar error
        throw error;
    }
});