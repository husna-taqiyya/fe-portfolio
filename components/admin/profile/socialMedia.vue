<template>
    <div class="flex flex-col gap-4">

        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Github</div>
            <input v-model="formData.github" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.github">{{ errors.github }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Gitlab</div>
            <input v-model="formData.gitlab" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.gitlab">{{ errors.gitlab }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Instagram</div>
            <input v-model="formData.instagram" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.instagram">{{ errors.instagram }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Facebook</div>
            <input v-model="formData.facebook" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.facebook">{{ errors.facebook }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Twitter</div>
            <input v-model="formData.twitter" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.twitter">{{ errors.twitter }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Linkedin</div>
            <input v-model="formData.linkedin" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.linkedin">{{ errors.linkedin }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Discord</div>
            <input v-model="formData.discord" type="text" placeholder="Type Here"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.discord">{{ errors.discord }}</div>
        </label>
    </div>
    <button class="btn btn-neutral float-right mt-5">Update</button>
</template>

<script setup>
const ProfileStore = useProfileStore();

const errors = ref({});
const formData = ref({
    github: ProfileStore.profile.github,
    gitlab: ProfileStore.profile.gitlab,
    instagram: ProfileStore.profile.instagram,
    facebook: ProfileStore.profile.facebook,
    twitter: ProfileStore.profile.twitter,
    linkedin: ProfileStore.profile.linkedin,
    discord: ProfileStore.profile.discord
});

</script>