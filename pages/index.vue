<template>
    <div class="grid grid-cols-10">
        <!-- PROFILE CARD -->
        <div class="col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen p-6">
            <IndexProfilecard :profile="profile" />
        </div>
        <!-- SECTIONS -->
        <div class="col-span-10 md:col-span-5 lg:col-span-6 xl:col-span-7 p-6 lg:px-20 xl:px-40">
            <IndexAbout :profile="profile" />
            <IndexBlog :blogs="blogs" />
            <IndexExperience :experience="experience" />
            <IndexEducation :education="education" />
            <IndexProject :projects="projects" />
            <IndexSkill :skills="skills" />
        </div>
    </div>
</template>

<script setup>

// SEO and META
const { value: useProfile } = useState('profile');
const fullname = `${useProfile.firstname} ${useProfile.lastname}`;
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

useSeoMeta({
    title: fullname + ' Portfolio',
    description: useProfile.bio,
    ogTitle: fullname + ' Portfolio',
    ogDescription: useProfile.bio,
    ogImage: apiUri + useProfile.avatar,
    twitterCard: 'summary_large_image',
})
// END: SEO and META

definePageMeta({
    middleware: ['profile']
});

const getPortfolio = async () => {
    try {
        return await $fetch('/api/portfolio')
    } catch (error) {
        throw createError(error);
    }
}


// CSR fect, dirubah ke SSR
const { profile, blogs, education, experience, projects, skills } = await getPortfolio();
</script>


