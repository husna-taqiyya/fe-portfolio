<template>
    <div class="grid grid-cols-10">
        <!-- PROFILE CARD -->
        <div class="col-span-10 md:col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen p-6">
            <IndexProfilecard :profile="profile" />
        </div>
        <!-- SECTIONS -->
        <div class="col-span-10 md:col-span-5 lg:col-span-6 xl:col-span-7 p-6 lg:px-20 xl:px-40">
            <IndexAbout :profile="dataProfile" />
            <IndexBlog :blogs="blogs" />
            <IndexExperience :experience="experience" />
            <IndexEducation :education="education" />
            <IndexProject :project="project" />
            <IndexSkill :skills="skills" />
        </div>
    </div>
</template>

<script setup>
// ambil data dari backend
// METODE EXTRACT
const { data } = await $fetch('http://localhost:5000/portfolio');

const profile = data.profile;
const project = data.project;
const experience = data.experience;
const education = data.education;
const skills = data.skills;
const blogs = data.blogs;


console.log("profile");
console.log(profile);
console.log("project");
console.log(project);
console.log("experience");
console.log(experience);
console.log("education");
console.log(education);
console.log("skills");
console.log(skills);
console.log("blogs");
console.log(blogs);


</script>


