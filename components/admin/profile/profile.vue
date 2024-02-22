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
                <div class="w-60 aspect-video bg-neutral/30 md:mx-auto rounded-xl">
                    <div v-if="!avatar" class="w-full h-full"></div>
                    <img v-else :src="avatar" class="object-cover min-h-full min-w-full">
                </div>
                <div class="flex md:justify-center mt-2">
                    <input @change="handleFile" type="file" accept="image/*"
                        class="file-input file-input-bordered w-full max-w-xs" />
                </div>
            </div>
            <label class="form-control w-full">
                <div class="label label-text pb-0">Bio</div>
                <textarea v-model="formData.bio" cols="30" rows="10" class="textarea textarea-bordered w-full"></textarea>
                <div class="text-error text-right text-sm pr-2" v-if="errors.bio">{{ errors.bio }}</div>
            </label>
        </div>
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
import dayjs from 'dayjs'
import { DatePicker } from 'v-calendar';

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const ProfileStore = useProfileStore();

const formData = ref({
    email: ProfileStore.profile.email,
    firstname: ProfileStore.profile.firstname,
    lastname: ProfileStore.profile.lastname,
    website: ProfileStore.profile.website,
    dob: ProfileStore.profile.dob,
    phone: ProfileStore.profile.phone,
    addres: ProfileStore.profile.addres,
    city: ProfileStore.profile.city,
    country: ProfileStore.profile.country,
    bio: ProfileStore.profile.bio,
    job: ProfileStore.profile.job
});

// AVATAR
const avatar = ref(
    ProfileStore.profile.avatar
        ? apiUri + ProfileStore.profile.avatar
        : null
)

let file_avatar = null;

const handleFile = (e) => {
    if (e.target.files.length) {
        const file = e.target.files[0];
        file_avatar = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            avatar.value = reader.result;
        }
    }
}

// confirmation
const confirm = ref(false);
const success = ref(false);
const isLoading = ref(false);

// handle update
const errors = ref({});
const fetchError = ref('');
const handleUpdate = async () => {
    // do update when isLoading == false
    if (isLoading.value == false) {
        isLoading.value = true;

        // close confirm modal
        confirm.value = false;
        // reset error
        errors.value = {};
        fetchError.value = '';

        try {
            await ProfileStore.update(formData.value, file_avatar);
            success.value = true;
            // close loading indicator
            isLoading.value = false;
        } catch (error) {
            // reset loading indicator
            isLoading.value = false;

            if (error instanceof Joi.ValidationError) {
                // joi error
                errors.value = joierror(error);
            } else {
                if (condition) {
                    //fetch error
                    fetchError.value = error.data.message;
                } else {
                    // code error                    
                    console.log(error)
                }
            }
        }
    }
}

</script>
