<template>
    <div class="min-h-screen py-12" id="skill">
        <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
            <LucideWrench :size="16" />
            <div class="uppercase text-sm font-light">SKILL</div>
        </div>
        <div class="mt-10">
            <!-- Subtitle -->
            <div class="text-4xl font-semibold">Every great <span class="text-accent">Projects</span> begin with
                willingness to <span class="text-accent">Learn</span></div>

            <!-- list of skills with category -->
            <div v-for="(category, i) in skills" :key="i" class="mb-6">
                <!-- category -->
                <div class="font-semibold uppercase text-secondary">{{ category.title }}</div>
                <div class="flex gap-6">
                    <!-- list of skills -->
                    <div v-for="(skill, k) in category.Skill" :key="k" class="group">
                        <!-- SVG -->
                        <div v-html="skill.svg"
                            class="aspect-square p-1 bg-white/75 w-16 rounded-md flex items-center justify-center group-hover:scale-110 duration-300">
                        </div>
                        <div class="text-center group-hover:text-accent text-nowrap text-sm">{{ skill.title }}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
defineProps({
    skills: Array
})
</script>

