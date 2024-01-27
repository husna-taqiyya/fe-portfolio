<template>
    <div class="min-h-screen py-12 flex flex-col" id="about">
        <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
            <div>
                <LucideUserRound :size="16" />
            </div>
            <div>About</div>
        </div>
        <div class="flex flex-col gap-12 mt-10 grow">
            <div class="text-6xl leading-tight">Say Hi from <span class="text-accent">{{ profile.firstname }}</span>,
                {{ profile.job }}</div>
            <!-- <div class="text-4xl font-semibold">Every great design begin with an even better story</div> -->
            <div class="font-light">{{ profile.bio }}</div>
        </div>
        <div class="flex items-end gap-20 grow pb-20">

            <div>
                <div class="text-4xl text-accent font-semibold">10+</div>
                <div>YEARS OF <br> EXPERIENCE</div>
            </div>
            <div>
                <div class="text-4xl text-accent font-semibold">10+</div>
                <div>PROJECT <br> COMPLETED</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    profile: Object
});
</script>