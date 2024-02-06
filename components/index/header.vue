<template>
    <!-- HEADER -->
    <div class="flex justify-between items-end my-4 border-b border-b-neutral pt-6 max-md:pt-20 pb-3">
        <div class="text-4xl font-bold">{{ fullname }}</div>
        <NuxtLink :to="url" class="text-xl">{{ title }}</NuxtLink>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    url: String
});

// get data profile from state
const useProfile = useState('profile');
const profile = useProfile.value;
const fullname = computed(() => {
    return `${profile.firstname} ${profile.lastname}`;
});

</script>
