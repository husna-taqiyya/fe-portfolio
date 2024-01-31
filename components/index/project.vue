<template>
    <div class="min-h-screen py-12" id="project">
        <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
            <LucideUserRound :size="16" />
            <div class="uppercase text-sm font-light">Project</div>
        </div>
        <div class="mt-10 font-semibold">Latest Project</div>
        <!-- LIST PROJECT -->
        <div class="grid grid-cols-2 gap-6 mt-8">
            <!-- PROJECT ITEM -->
            <div class="col-span-2 md:col-span-1 group" v-for="(project, i) in projects" :key="i">
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
                    <div v-for="skill in project.skill" class="border border-neutral px-3 text-nowrap">{{ skill.Skill.title
                    }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    projects: Array
})

console.log(props)

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;


</script>

