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
// manggil data dari back end test

// CSR fect, dirubeh ke SSR
// METODE EXTRACT
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


