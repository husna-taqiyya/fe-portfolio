<template>
    <div class="min-h-screen py-12" id="education">
        <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
            <LucideBrifecase :size="16" />
            <div class="uppercase text-sm font-light">Education</div>
        </div>
        <div class="flex flex-col gap-6 mt-10">
            <div class="text-4xl font-semibold">Education & Experience</div>
            <div>
                <!-- list experience -->
                <div class="flex gap-12" v-for="n in 2" key="n">
                    <div class="flex flex-col items-center">
                        <LucideCircle :size="12" class="fill-neutral stroke-none" />
                        <div class="grow w-px bg-neutral"></div>
                    </div>
                    <div class="mb-10">
                        <div>2020 - Present</div>
                        <div class="flex flex-col gap-4">
                            <div>
                                <div class="text-4xl font-semibold mt-5">Framer Desinger & Developer</div>
                                <div class="text-light">Brunodee Agency</div>
                            </div>
                            <div>
                                <div class="text-4xl font-semibold">Front-End WordPress Developer</div>
                                <div class="text-light">Envato Market</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>