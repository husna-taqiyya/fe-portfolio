<template>
    <div class="md:fixed min-h-screen md:flex md:items-center md:w-[38%] lg:w-[32%] xl:w-[25%]">
        <div class="border border-neutral rounded-3xl p-12 w-full flex flex-col gap-6">
            <div class="flex justify-between items-end">
                <!-- Nama dan Title -->
                <div class="text-3xl font-bold">DRAKE</div>
                <div class="text-right">Framer Designer <br /> & Developer</div>
            </div>
            <!-- Taro Image -->
            <div class="aspect-square bg-neutral rounded-2xl"></div>
            <!-- EMAIL DAN LOKASI -->
            <div class="text-2xl font-semibold text-center">
                <div>email@example.com</div>
                <div>Jakarta</div>
            </div>
            <!-- COPYRIGHT -->
            <div class="text-center font-thin text-white/50">&copy;2022, Drake. All Rights Reserved</div>
            <!-- SOCIAL BUTTON -->
            <div class="flex justify-between">
                <div class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideInstagram :size="20" class="text-secondary" />
                </div>
                <div class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideTwitter :size="20" class="text-secondary" />
                </div>
                <div class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideGithub :size="20" class="text-secondary" />
                </div>
                <div class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideGlobe :size="20" class="text-secondary" />
                </div>
            </div>

            <!-- HIRE ME BUTTON -->
            <button class="btn btn-accent w-full rounded-2xl">
                <LucideMail />
                <div>HIRE ME!</div>
            </button>


        </div>
    </div>
</template>

<script>

</script>
