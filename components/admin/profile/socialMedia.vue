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
    <div>
        <div class="flex">
            <button @click="confirm = true" class="btn btn-neutral my-5">Update</button>
            <ImagesLoading v-show="isLoading" class="w-10" />
        </div>
        <div class="text-error text-sm text-right">{{ fetchError }}</div>
    </div>
    <!-- MODAL CONFIRMATION -->
    <AdminModalConfirm :show="confirm" @close="confirm = false" @saved="handleUpdate">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Are you sure to update profile?</p>
    </AdminModalConfirm>

    <!-- MODAL SUCCESS -->
    <AdminModalSuccess :show="success" @close="success = false" />
</template>

<script setup>
import Joi from 'joi';

const ProfileStore = useProfileStore();

const formData = ref({
    github: ProfileStore.profile.github,
    gitlab: ProfileStore.profile.gitlab,
    instagram: ProfileStore.profile.instagram,
    facebook: ProfileStore.profile.facebook,
    twitter: ProfileStore.profile.twitter,
    linkedin: ProfileStore.profile.linkedin,
    discord: ProfileStore.profile.discord
});

// confirmation
const confirm = ref(false);
const success = ref(false);
const isLoading = ref(false);

// handle Update
const errors = ref({});
const fetchError = ref('');
const handleUpdate = async () => {
    // do update when isLoading == false
    if (isLoading.value == false) {
        isLoading.value = true;

        confirm.value = false;
        // reset error
        errors.value = {};
        fetchError.value = '';

        try {
            await ProfileStore.update(formData.value);
            success.value = true;
            isLoading.value = false;
        } catch (error) {
            console.log(error);
            // reset loading indicator
            isLoading.value = false;

            if (error instanceof Joi.ValidationError) {
                // joi error
                errors.value = joierror(error);
            } else {
                //fetch error
                fetchError.value = error.data.message;
            }
        }
    }
}


</script>