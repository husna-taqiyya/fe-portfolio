<template>
    <div class="flex flex-col gap-4">
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Name</div>
            <input v-model="form.name" type="text" placeholder="Type Here" class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.name">{{ errors.name }}</div>
        </label>
        <label class="form-control w-full max-w-xs">
            <div class="label label-text pb-0">Email</div>
            <input v-model="form.email" type="text" placeholder="Type Here" class="input input-bordered w-full max-w-xs">
            <div class="text-error text-right text-sm p-2" v-if="errors.email">{{ errors.email }}</div>
        </label>
    </div>

    <div class="flex items-center gap-2">
        <label @click="confirm = true" class="btn btn-neutral my-5">Update</label>
        <div class="text-error text-sm text-right mr-2">{{ fetchError }}</div>
    </div>
    <AdminModalConfirm :show="confirm" @close="confirm = false" @saved="handleUpdate" />
    <AdminModalSuccess :show="success" @close="success = false" />
</template>

<script setup>
import Joi from 'joi';

const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref('');

const form = ref({
    name: AuthStore.user.name,
    email: AuthStore.user.email,
});

const confirm = ref(false);
const success = ref(false);

const handleUpdate = async () => {
    // reset errors
    errors.value = {}
    fetchError.value = '';

    try {
        await AuthStore.update(form.value);
        // fetch data update
        confirm.value = false;
        success.value = true;
    } catch (error) {
        console.log(error);
        confirm.value = false;
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