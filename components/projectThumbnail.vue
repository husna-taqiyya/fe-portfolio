<template>
    <NuxtLink :to="'project/' + project.id" class="group">
        <div class="flex flex-col">
            <div class="font-semibold text-xl group-hover:text-accent">{{ project.title }} </div>
            <div class="text-sm mb-1"> {{ project.readStartDate }} - {{ project.readEndDate }} </div>
        </div>

        <!-- IMAGE -->
        <div class="rounded-xl aspect-video overflow-hidden group-hover:scale-105 duratin-300">
            <img v-if="project.photos.length" :src="apiUri + project.photos[0].path" :alt="project.title"
                class="object-hover">
            <!-- tampilkan dummy -->
            <div v-else class="aspect-video bg-neutral"></div>
        </div>

        <!-- SKILL -->
        <div class="flex flex-nowrap overflow-hidden gap-2 mt-2">
            <div v-for="skill in project.skill" class="border border-neutral px-3 text-nowrap">{{
                skill.Skill.title
            }}</div>
        </div>
    </NuxtLink>
</template>

<script setup>
defineProps({
    project: Object
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;


</script>