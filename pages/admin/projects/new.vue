<template>
    <div>
        <div class="font-semibold mb-6 pb-2 border-b border-b-neutral flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideLayoutDashboard :size="30" /> NEW PROJECT
            </div>
        </div>

        <!-- title -->
        <label class="form-control w-full">
            <div class="label label-text pb-0">Title</div>
            <input v-model="formData.title" type="text" placeholder="Title"
                class="input input-bordered w-full font-bold" />
            <div class="text-error text-right text-sm pr-2" v-if="errors.title">{{ errors.title }}</div>
        </label>

        <div class="label label-text pb-0">Status Project</div>
        <div class="flex gap-4">
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500" checked />
                    <span class="label-text">ON PROGRESS</span> 
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500" checked />
                    <span class="label-text">MAINTENANCE</span> 
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500" checked />
                    <span class="label-text">COMPLETE</span> 
                </label>
            </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-3">
            <!-- company -->
            <label class="form-control w-full">
                <div class="label label-text pb-0">Company</div>
                <input v-model="formData.company" type="text" placeholder="Company"
                    class="input input-bordered w-full font-bold" />
                <div class="text-error text-right text-sm pr-2" v-if="errors.company">{{ errors.company }}</div>
            </label>
    
            <!-- url -->
            <label class="form-control w-full">
                <div class="label label-text pb-0">Url</div>
                <input v-model="formData.url" type="text" placeholder="Url"
                    class="input input-bordered w-full font-bold" />
                <div class="text-error text-right text-sm pr-2" v-if="errors.url">{{ errors.url }}</div>
            </label>
            
            <!-- github -->
            <label class="form-control w-full">
                <div class="label label-text pb-0">Github</div>
                <input v-model="formData.github" type="text" placeholder="Github"
                    class="input input-bordered w-full font-bold" />
                <div class="text-error text-right text-sm pr-2" v-if="errors.github">{{ errors.github }}</div>
            </label>
            
            <!-- gitlab -->
            <label class="form-control w-full">
                <div class="label label-text pb-0">Gitlab</div>
                <input v-model="formData.gitlab" type="text" placeholder="Gitlab"
                    class="input input-bordered w-full font-bold" />
                <div class="text-error text-right text-sm pr-2" v-if="errors.gitlab">{{ errors.gitlab }}</div>
            </label>
        </div>

        <!-- description -->
        <label class="form-control w-full">
            <div class="label label-text pb-0">Description</div>
            <textarea v-model="formData.description" rows="10" class="textarea textarea-primary"
                placeholder="Description"></textarea>
            <div class="text-error text-right text-sm" v-if="errors.description">{{ errors.description }}</div>
        </label>

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const formData = ref({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: null,
    status: 'ON_PROGRESS',
    url: '',
    github: '',
    gitlab: '',
    company: ''
});

const errors = ref({});
// photos
// skills
</script>