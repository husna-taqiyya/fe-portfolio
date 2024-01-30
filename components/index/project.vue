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
            <div class="col-span-2 md:col-span-1 group" v-for="(project, i) in project" :key="i">
                <div class="flex justify-between items-end">
                    <div class="font-semibold text-xl text-secondary group-hover:text-accent">{{ project.title }}</div>
                    <div> {{ project.readstartDate }} - {{ project.endDate ? project.endDate : 'Present' }}</div>
                </div>
                <div class="aspect-video bg-neutral rounded-xl group-hover:scale-105"></div>
                <!-- SKILL -->
                <div class="flex flex-nowrap overflow-hidden gap-2 mt-2">
                    <div v-for="n in 10" class="border border-neutral px-3 text-nowrap">skill {{ n }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    project: Array
})

</script>

