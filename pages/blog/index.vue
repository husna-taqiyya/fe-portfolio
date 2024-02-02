<template>
    <div class="max-w-7xl mx-auto px-4 pb-16">
        <!-- HEADER -->
        <div class="flex justify-between items-end my-4 border-b border-b-neutral pt-6 max-md:pt-20 pb-3">
            <div class="text-4xl font-bold">FULLNAME</div>
            <div class="text-xl">Blog</div>
        </div>

        <!-- LOOP DATA BLOGS -->
        <div class="flex justify-between items-end">
            <div class="text-xl font-semibold my-6">My Latest <span class="text-accent">Blogs</span></div>
            <div class="join">
                <button class="join-item btn"></button>
                <button class="join-item btn">Page {{ page }}</button>
                <button class="join-item btn"></button>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-8">
            <NuxtLink :to="'blog/' + blog.id" v-for="blog in blogs.data" class="w-full group">
                <div class="text-accent text-xl font-bold">{{ blog.title }}</div>
                <div class="text-sm font-light">{{ blog.shortDateTime }}</div>
                <div class="group-hover:scale-105 duration-300 mt-1">
                    <!-- image data -->
                    <img v-if="blog.photos.length" :src="apiUri + blog.photos[0].path" alt=""
                        class="w-full aspect-video rounded-xl">
                    <!-- image dummy -->
                    <div v-else class="w-full aspect-video bg-neutral rounded-xl"></div>
                    <div class="line-clamp-2 font-light">{{ blog.content }}</div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

// ambil data blogs melalui server
const blogs = await $fetch('/api/blog');
const page = blogs.page;
const maxPage = blogs.maxPage;
</script>