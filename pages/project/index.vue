<template>
    <div class="max-w-7xl mx-auto px-4 pb-16">
        <!-- HEADER -->
        <div class="flex justify-between items-end my-4 border-b border-b-neutral pt-6 max-md:pt-20 pb-3">
            <div class="text-4xl font-bold">FULLNAME</div>
            <div class="text-xl">Project</div>
        </div>
    </div>

    <template v-if="projects">
        <!-- PAGINATION TOP -->
        <div class="flex max-md:flex-col justify-between md:items-end">
            <div class="max-md:w-full text-4xl font-semibold my-6">My Latest <span class="text-accent">Projects</span>
            </div>
            <div class="join">
                <button class="join-item btn" :class="{ 'btn-disabled': page == 1 }" @click="page--">«</button>
                <button class="join-item btn">Page {{ projects.page }}</button>
                <button class="join-item btn" :class="{ 'btn-disabled': page == maxPage }" @click=page++>»</button>
            </div>
        </div>

        <!-- LOOP DATA PROJECTS -->
        <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <template v-for="project in projects.data" :key="project.id">
                <ProjectThumbnail :project="project" class="w-full"></ProjectThumbnail>
            </template>
        </div>

        <!-- PAGINATION BUTTOM -->
        <div class="flex justify-end items-end mt-6">
            <div class="join">
                <button class="join-item btn" :class="{ 'btn-disabled': page == 1 }" @click="page--">«</button>
                <button class="join-item btn">Page {{ projects.page }}</button>
                <button class="join-item btn" :class="{ 'btn-disabled': page == maxPage }" @click=page++>»</button>
            </div>
        </div>
    </template>
</template>

<script setup>
import ProjectThumbnail from '../../components/projectThumbnail.vue'

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

// ambil data blogs melalui server nuxt
const projects = ref(null);
const maxPage = ref(1);
const page = ref(1);

const fetchData = async () => {
    projects.value = await $fetch('/api/project?page=' + page.value);
    maxPage.value = projects.value.maxPage;
}

// register on before mount
onBeforeMount(async () => {
    await fetchData();
})

// watch effect
watchEffect(async () => {
    await fetchData();
});

</script>