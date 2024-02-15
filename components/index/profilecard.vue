<template>
    <div class="md:fixed min-h-screen md:flex md:items-center md:w-[38%] lg:w-[32%] xl:w-[25%]">
        <div class="border border-neutral rounded-3xl p-12 w-full flex flex-col gap-6">
            <div class="flex justify-between items-end">
                <!-- Nama dan Title -->
                <div class="text-3xl font-bold">{{ fullname }}</div>
                <div class="text-right">{{ profile.job }}</div>
            </div>
            <!-- Taro Image -->
            <div v-if="profile.avatar" class="aspect-square rounded-2xl overflow-hidden">
                <img :src="apiUri + profile.avatar" :alt="fullname" class="object-cover min-h-full min-w-full">
            </div>
            <div v-else class="aspect-square bg-neutral rounded-2xl"></div>

            <!-- EMAIL DAN LOKASI -->
            <div class="text-2xl font-semibold text-center">
                <div>{{ profile.email }}</div>
                <div>{{ profile.city }}, {{ profile.country }}</div>
            </div>
            <!-- COPYRIGHT -->
            <div class="text-center font-thin text-white/50">&copy;{{ year }} {{ profile.lastname }}. All Rights Reserved
            </div>
            <!-- SOCIAL BUTTON -->
            <div class="flex flex-wrap justify-center gap-4">
                <a v-if="profile.instagram" :href="profile.instagram" target="__blank"
                    class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideInstagram :size="20" class="text-secondary" />
                </a>

                <a v-if="profile.twitter" :href="profile.twitter" target="__blank"
                    class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideTwitter :size="20" class="text-secondary" />
                </a>
                <a v-if="profile.github" :href="profile.github" target="__blank"
                    class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideGithub :size="20" class="text-secondary" />
                </a>
                <a v-if="profile.web" :href="profile.web" target="__blank"
                    class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideGlobe :size="20" class="text-secondary" />
                </a>
                <a v-if="profile.facebook" :href="profile.facebook" target="__blank"
                    class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideGlobe :size="20" class="text-secondary" />
                </a>
                <a v-if="profile.linkedin" :href="profile.linkedin" target="__blank"
                    class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideLinkedin :size="20" class="text-secondary" />
                </a>
                <a v-if="profile.gitlab" :href="profile.gitlab" target="__blank"
                    class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <LucideGlobe :size="20" class="text-secondary" />
                </a>
                <a v-if="profile.discord" :href="profile.discord" target="__blank"
                    class="btn btn-outline btn-circle border-neutral hover:bg-transparent hover:border-secondary">
                    <IconsDiscord class="" />
                </a>
            </div>

            <!-- HIRE ME BUTTON -->
            <button class="btn btn-accent w-full rounded-2xl">
                <LucideMail />
                <div>HIRE ME!</div>
            </button>


        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const props = defineProps({
    profile: Object
});

// computing fullName
const fullname = computed(() => {
    return `${props.profile.firstname} ${props.profile.lastname}`
})

const year = new Date().getFullYear();

</script>
