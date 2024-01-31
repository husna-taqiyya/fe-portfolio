export default defineCachedEventHandler(async (event) => {
    // INI menghandle SSR
    return await $fetch('http://localhost:5000/portfolio');

})