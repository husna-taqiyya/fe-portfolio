<template>
    <div class="flex flex-col gap-4">
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Old Password</div>
            <input v-model="form.current_password" type="password" placeholder="Password"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.current_password">{{
                errors.current_password
            }}
            </div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">New Password</div>
            <input v-model="form.password" type="password" placeholder="Password"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.password">{{ errors.password }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Confirm New Password</div>
            <input v-model="form.confirm_password" type="password" placeholder="Confirm Password"
                class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.confirm_password">{{
                errors.confirm_password
            }}
            </div>
        </label>

        <div class="flex items-center gap-2">
            <div class="flex">
                <button @click="confirm = true" class="btn btn-neutral my-5">Update</button>
                <ImagesLoading v-show="isLoading" class="w-10" />
            </div>
            <div class="text-error text-sm text-right mr-2">{{ fetchError }}</div>
        </div>
        <!-- MODAL CONFIRMATION -->
        <LazyAdminModalConfirm :show="confirm" text_save="Change Password" @close="confirm = false" @saved="handleUpdate">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Are you sure to change password?</p>
        </LazyAdminModalConfirm>
        <!-- MODAL SUCCESS -->
        <LazyAdminModalSuccess :show="success" @close="success = false" />
    </div>
</template>

<script setup>
import Joi from 'joi';

const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref('');

const form = ref({
    current_password: '',
    password: '',
    confirm_password: ''
});

const confirm = ref(false);
const success = ref(false);
const isLoading = ref(false);

const handleUpdate = async () => {
    // reset errors
    errors.value = {}
    fetchError.value = '';
    isLoading.value = true;

    try {
        await AuthStore.update(form.value);
        // fetch data update
        confirm.value = false;
        success.value = true;
        isLoading.value = false;
    } catch (error) {
        confirm.value = false;
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

</script>