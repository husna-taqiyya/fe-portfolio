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
            <div v-for="m in 4" class="mb-6">
                <!-- category -->
                <div class="font-semibold uppercase text-secondary">SKILL CATEGORY</div>
                <div class="flex gap-6">
                    <!-- list of skills -->
                    <div v-for="n in 10" class="group">
                        <div
                            class="aspect-square bg-neutral w-16 rounded-md items-center justify-center group-hover:scale-105">
                            <LucideWrench :size="28" />
                        </div>
                        <div class="text-center group-hover:text-accent text-nowrap text-sm">Skill test {{ n }}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

</script>

