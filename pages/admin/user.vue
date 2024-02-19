<template>
    <div>
        <div class="font-semibold mb-4 border border-b-white">USER SETTINGS</div>
        <div class="flex flex-col gap-4">
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Name</div>
                <input v-model="form.name" type="text" placeholder="Type Here" class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.name">{{ errors.name }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Email</div>
                <input v-model="form.email" type="text" placeholder="Type Here"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.email">{{ errors.email }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Old Password</div>
                <input v-model="form.current_password" type="password" placeholder="Password"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.current_password">{{ errors.current_password }}
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
                <div class="text-error text-right text-sm p-2" v-if="errors.confirm_password">{{ errors.confirm_password }}
                </div>
            </label>
        </div>

        <div class="flex items-center gap-2">
            <label class="btn btn-neutral my-5" for="confirm">Update</label>
            <div class="text-error text-sm text-right mr-2">{{ fetchError }}</div>
        </div>

        <!-- MODAL CONFIRMATION -->
        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="confirm" class="modal-toggle" />
        <div class="modal" role="dialog">
            <div class="modal-box">
                <!-- x corner button -->
                <form method="dialog">
                    <label for="confirm" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                </form>
                <h3 class="font-bold text-lg">Hello!</h3>
                <p class="py-4">Are you sure?</p>
                <div class="modal-action">
                    <label for="confirm" class="btn">Close</label>
                    <label for="confirm" @click="handleUpdate" class="btn btn-neutral">Update</label>
                </div>
            </div>
            <!-- click outside -->
            <form method="dialog" class="modal-backdrop">
                <label for="confirm">Close</label>
            </form>
        </div>

        <!-- MODAL SUCCESS -->
        <input v-model="success" type="checkbox" id="success" class="modal-toggle" />
        <div class="modal" role="dialog">
            <div class="modal-box">
                <!-- x corner button -->
                <form method="dialog">
                    <label for="success" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                </form>
                <h3 class="font-bold text-lg">SUCCESS!</h3>
                <div class="modal-action">
                    <label for="success" class="btn">Close</label>
                </div>
            </div>
            <!-- click outside -->
            <form method="dialog" class="modal-backdrop">
                <label for="success">Close</label>
            </form>
        </div>
    </div>
</template>

<script setup>
import Joi from 'joi';
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const AuthStore = useAuthStore();

const errors = ref({});
const fetchError = ref('');

const form = ref({
    name: AuthStore.user.name,
    email: AuthStore.user.email,
    current_password: '',
    password: '',
    confirm_password: ''
});

const success = ref(false);

const handleUpdate = async () => {
    // reset errors
    errors.value = {}
    fetchError.value = '';

    try {
        await AuthStore.update(form.value);
        // fetch data update
        success.value = true;
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