<template>
    <div class="min-h-screen py-12" id="blog">
        <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
            <LucideNewspaper :size="16" />
            <div class="uppercase text-sm font-light">Blog</div>
        </div>
        <div class="flex flex-col gap-6 mt-10">
            <!-- LIST BLOG -->
            <div class="grid grid-cols-10 gap-3" v-for="n in 4" :key="n">
                <!-- IMAGES -->
                <div class="aspect-video bg-neutral col-span-3 rounded-lg"></div>
                <div class="col-span-7">
                    <div class="text-2xl font-semibold">Judul Blog</div>
                    <div class="font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nostrum similique
                        natus. Maxime
                        cupiditate ipsam, dignissimos quia corrupti sapiente molestias.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

