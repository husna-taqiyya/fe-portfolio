<template>
    <div class="max-w-7xl mx-auto ">
        <!-- ini title -->
        <div class="text-4xl font-semibold my-4">{{ blog.title }}</div>

        <!-- photos -->
        <div>
            <!-- <img v-for="photo in blog.photos" :src="apiUri + photo.path" alt="blog.title"> -->

            <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="5000">
                <slide v-for="photo in blog.photos" :key="photo.id">
                    <div class="aspect-video w-full">
                        <div class="w-full h-full flex justify-center bg-contain">
                            <img :src="apiUri + photo.path" :alt="blog.title" class="h-full">
                        </div>
                    </div>
                </slide>

                <template #addons>
                    <navigation />
                    <pagination />
                </template>
            </Carousel>
        </div>

        <!-- content -->
        <div class="my-4">{{ blog.content }}</div>
    </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const route = useRoute();
const blogID = route.params.id;

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const blog = await $fetch('/api/blog/' + blogID)


// ambil data blog, dari server nuxt



</script>

