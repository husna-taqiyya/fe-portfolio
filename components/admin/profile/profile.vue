<template>
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="flex flex-col gap-4">
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Email</div>
                <input v-model="formData.email" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.email">{{ errors.email }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Firstname</div>
                <input v-model="formData.firstname" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.firstname">{{ errors.firstname }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Lastname</div>
                <input v-model="formData.lastname" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.lastname">{{ errors.lastname }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Website</div>
                <input v-model="formData.website" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.website">{{ errors.website }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Date of Birdth</div>

                <DatePicker v-model="formData.dob" color="gray">
                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25 font-normal">
                            {{ dayjs(formData.dob).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>

                <div class="text-error text-right text-sm p-2" v-if="errors.dob">{{ errors.dob }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Address</div>
                <input v-model="formData.addres" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.addres">{{ errors.addres }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">city</div>
                <input v-model="formData.city" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.city">{{ errors.city }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Country</div>
                <input v-model="formData.country" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.country">{{ errors.country }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Phone</div>
                <input v-model="formData.phone" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.phone">{{ errors.phone }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">job</div>
                <input v-model="formData.job" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.job">{{ errors.job }}</div>
            </label>
        </div>
        <div>
            <div>
                Avatar
                <div v-if="!ProfileStore.profile.avatar" class="w-60 aspect-video bg-neutral/30 md:mx-auto rounded-xl">
                </div>
                <img v-else :src="apiUri + ProfileStore.profile.avatar" class="object-cover min-h-full min-w-full">
            </div>
            <label class="form-control w-full">
                <div class="label label-text pb-0">Bio</div>
                <textarea v-model="formData.bio" cols="30" rows="10" class="textarea textarea-bordered w-full"></textarea>
                <div class="text-error text-right text-sm pr-2" v-if="errors.bio">{{ errors.bio }}</div>
            </label>
        </div>
    </div>
    <div>
        <button @click="handleUpdate" class="btn btn-neutral float-right mt-5">Update</button>
        <div class="text-error text-sm text-right">{{ fetchError }}</div>
    </div>
</template>

<script setup>
import Joi from 'joi';
import dayjs from 'dayjs'
import { DatePicker } from 'v-calendar';

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const ProfileStore = useProfileStore();

const errors = ref({});
const fetchError = ref('');

const formData = ref({
    email: ProfileStore.profile.email,
    firstname: ProfileStore.profile.firstname,
    lastname: ProfileStore.profile.lastname,
    website: ProfileStore.profile.website,
    dob: ProfileStore.profile.dob,
    addres: ProfileStore.profile.addres,
    city: ProfileStore.profile.city,
    country: ProfileStore.profile.country,
    bio: ProfileStore.profile.bio,
    job: ProfileStore.profile.job
});

const handleUpdate = async () => {
    // reset error
    errors.value = {}
    fetchError.value = ''

    try {
        await ProfileStore.update(formData.value);
    } catch (error) {
        console.log(error);
        if (error instanceof Joi.ValidationError) {
            // joi error
            errors.value = joierror(error);
        } else {
            //fetch error
            fetchError.value = error.data.message;
        }
    }
}

</script>
