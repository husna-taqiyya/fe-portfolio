<template>
    <div class="min-h-screen py-12" id="blog">
        <div class="rounded-2xl border border-neutral w-fit px-4 py-1 flex items-center gap-2">
            <LucideNewspaper :size="16" />
            <div class="uppercase text-sm font-light">Blog</div>
        </div>
        <div class="flex flex-col gap-6 mt-10">
            <div class="text-4xl font-semibold">Latest Blog</div>
            <!-- LIST BLOG -->
            <div class="grid grid-cols-10 gap-3 group hover:bg-secondary p-2 rounded-xl" v-for="n in 4" :key="n">
                <!-- IMAGES -->
                <div class="aspect-video bg-neutral col-span-4 xl:col-span-3 rounded-lg group-hover:scale-105 duration-300">
                </div>
                <div class="col-span-6 xl:col-span-7">
                    <!-- judul -->
                    <div class="text-2xl font-semibold group-hover:text-accent">Judul Blog</div>
                    <div class="font-light line-clamp-2 xl:line-clamp-3">Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Incidunt inventore corporis iste eveniet error quisquam voluptatem sed tempora enim officia
                        numquam, cupiditate ad, a dolorem autem harum sequi. Minus at dolor possimus consectetur sint et
                        alias, expedita sapiente aut delectus porro ut fuga itaque temporibus magni non quod. Hic, similique
                        molestiae ducimus ipsum, esse minus distinctio saepe voluptate aperiam accusantium ea odit quis
                        consequuntur aliquam corporis. Dicta, atque nulla itaque ipsum quos dolor vero voluptatibus mollitia
                        excepturi maiores quisquam corporis fugiat voluptates repellendus minima officiis laborum commodi
                        expedita explicabo tempore neque fuga vitae? Ut, eveniet ratione? Consequatur, odio asperiores.
                        Harum?</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

