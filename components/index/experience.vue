<template>
    <div class="min-h-screen py-12" id="experience">
        <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
            <LucideGraduationCap :size="16" />
            <div class="uppercase text-sm font-light">Experience</div>
        </div>
        <div class="flex flex-col gap-6 mt-10">
            <div class="text-4xl font-semibold">Experience</div>
            <div>
                <!-- list experience -->
                <div class="flex gap-6 md:gap-12 group" v-for="(exp, i) in experience" key="i">
                    <div class="flex flex-col items-center">
                        <LucideCircle :size="12" class="fill-neutral stroke-none group-hover:fill-accent" />
                        <div class="grow w-px bg-neutral"></div>
                    </div>
                    <div class="mb-10">
                        <!-- TODO readable date Nov 2022 -Present -->
                        <!-- TODO readable date Nov 2022 - Des 2023 -->
                        <div class="group-hover:text-accent">{{ exp.readStartDate }} - {{ exp.readEndDate }}</div>
                        <div class="flex flex-col gap-4">
                            <div>
                                <div class="text-xl md:text-3xl xl:text-4xl font-semibold mt-2">{{ exp.title }}
                                </div>
                            </div>
                            <div>
                                <div class="text-xl md:text-3xl xl:text-4xl font-semibold">{{ exp.company }}
                                </div>
                                <div class="text-light">{{ exp.description }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    experience: Array
})
</script>