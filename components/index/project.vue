<template>
    <div class="min-h-screen py-12" id="project">
        <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
            <LucideUserRound :size="16" />
            <div class="uppercase text-sm font-light">Project</div>
        </div>
        <div class="mt-10">
            <div class="text-4xl font-semibold">Latest Project</div>
            <!-- LIST PROJECT -->
            <div class="grid grid-cols-2 gap-6 mt-8">
                <!-- PROJECT ITEM -->
                <template v-for="(project, i) in projects" :key="i">
                    <ProjectThumbnail :project="project" class="col-span-2 md:col-span-1" />
                </template>
            </div>
            <NuxtLink to="/project" class="btn btn-accent w-min truncate px-8 max-auto">See All Projects</NuxtLink>
        </div>
    </div>
</template>

<script setup>
defineProps({
    projects: Array
})



</script>

