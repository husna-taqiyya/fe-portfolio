<template>
    <div class="max-w-7xl mx-auto bg-indigo-300 ">
        <!-- ini title -->
        <div class="text-4xl font-semibold">{{ blog.title }}</div>

        <!-- photos -->
        <div>
            <img v-for="photo in blog.photos" :src="apiUri + photo.path" alt="blog.title">
        </div>

        <!-- content -->
        <div>{{ blog.content }}</div>
    </div>
</template>

<script setup>
const route = useRoute();
const blogID = route.params.id;

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const blog = await $fetch('/api/blog/' + blogID)


// ambil data blog, dari server nuxt



</script>
