<template>
    <div class="bg-black w-screen h-screen max-h-screen max-w-screen overflow-hidden relative">
        <a href="/" class="absolute top-10 left-10 md:left-20 text white text 2xl md:text-4xl font-semibold">
            {{ url.origin }}
        </a>

        <div class="w-full h-full grid grid-rows-2 md:grid-rows-1 items-center px-20">
            <div class="flex flex-col gap-2 md:gap-6">
                <div class="text-4xl md:text-7xl font-bold text-white mb-2 md:mb-4">ERROR {{ error.statusCode }}</div>
                <div class="text-3xl md:text-5xl font-bold text-white">{{ error.statusMessage || error.message }}</div>
            </div>
            <div class="text-white text-wrap max-w-screen" v-html="error.stack"></div>
            <a href="/" class="btn w-min truncate z-10">Back To Home</a>
        </div>
    </div>

    <ImagesBrokenRobot v-if="error.statusCode == 404"
        class="w-[110vw] md:w-[80vw] xl:w-[55vw] absolute -right-28 bottom-10" />
    <ImagesHills class="absolute w-[180vw] -bottom-5 sm:-bottom-12 md:-bottom-18 lg:-bottom-32 xl:-bottom-48 -left-48" />
</template>

<script setup>
const props = defineProps({
    error: Object
});

const url = useRequestURL();

</script>
<style>
.error-stack pre {
    text-wrap: wrap;
}
</style>
