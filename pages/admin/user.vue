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
                <div class="label label-text pb-0">Password</div>
                <input v-model="form.password" type="text" placeholder="Password"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.password">{{ errors.password }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text pb-0">Confirm Password</div>
                <input v-model="form.confirm_password" type="text" placeholder="Confirm Password"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm p-2" v-if="errors.confirm_password">{{ errors.confirm_password }}
                </div>
            </label>
        </div>

        <button class="btn btn-neutral my-5">Update</button>

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const AuthStore = useAuthStore();

const errors = ref({});
const form = ref({
    name: AuthStore.user.name,
    email: AuthStore.user.email,
    password: '',
    confirm_password: ''
});

const handleUpdate = () => {
    // kofirmasi
    // kofirmasi
    // kofirmasi
}

</script>