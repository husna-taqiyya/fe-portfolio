<template>
    <div class="max-w-7xl mx-auto px-4 pb-16">
        <!-- HEADER -->
        <div class="flex justify-between items-end my-4 border-b border-b-neutral pt-6 max-md:pt-20 pb-3">
            <div class="text-4xl font-bold">FULLNAME</div>
            <NuxtLink to="/project" class="text-xl">Project</NuxtLink>
        </div>

        <!-- Judul project -->
        <div class="text-4xl font-semibold my-4 text-justify text-accent">{{ project.title }}</div>
        <div class="grid grid-cols-10 gap-6">
            <!-- SISI KIRI -->
            <div class="col-span-full md:col-span-7">
                <!-- photos -->
                <div v-if="project.photos.length">
                    <Carousel :items-to-show="1.5" :wrapAround="true" :autoplay="10000">
                        <slide v-for="photo in project.photos" :key="photo.id">
                            <div class="aspect-video w-full">
                                <div class="w-full h-full flex justify-center bg-contain">
                                    <img :src="apiUri + photo.path" :alt="project.title" class="h-full">
                                </div>
                            </div>
                        </slide>

                        <template #addons>
                            <navigation />
                            <pagination />
                        </template>
                    </Carousel>
                </div>
                <!-- DUMMY PHOTO -->
                <div v-else class="aspect-video bg-neutral rounded-xl"></div>

                <!-- description, muncul ketika layar lebar -->
                <div class="mt-2 max-md:hidden">
                    <div class="my-4 text-justify">{{ project.description }}</div>
                </div>
            </div>

            <!-- SISI KANAN -->
            <div class="col-span-full md:col-span-3">
                <!-- DATE DETAIL -->
                <div class="font-light text-sm">{{ project.readStartDate }} - {{ project.readEndDate }}</div>
                <div><span class="font-semibold">STATUS:{{ status }}</span></div>
                <!-- COMPANY DETAIL -->
                <div v-if="project.company">
                    <span class="font-semibold">Company:</span> {{ project.company }}
                </div>
                <!-- URL DETAIL -->
                <div v-if="project.uri">
                    <span class="font-semibold">Url:</span><a :href="project.url" target="_blank">{{ project.url }}</a>
                </div>

                <!-- SKILLS -->
                <template v-if="project.skills.length">
                    <div class="font-semibold mt-4">TECHNOLOGIES:</div>
                    <div class="flex flex-wrap gap-4">
                        <div v-for="skill in project.skills" :key="skill" class="adge badge-lg badge-outline text-accent">
                            <div v-html="skill.svg" class="w-5 mr-2 bg-neutral-100 rounded"></div>
                            {{ skill.title }}
                        </div>
                    </div>
                </template>

                <!-- description, muncul ketika layar kecil -->
                <div class="mt-2 max-md:hidden">
                    <div class="my-4 text-justify">{{ project.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const route = useRoute();
const projectID = route.params.id;

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const project = await $fetch('/api/project/' + projectID);

const status = computed(() => {
    return project.status.replaceAll('_', '');
});
</script>

