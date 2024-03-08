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

        <!-- STATUS -->
        <div class="label label-text pb-0">Status Project</div>
        <div class="flex gap-4">
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500" value="ON_PROGRESS" />
                    <span class="label-text">ON PROGRESS</span> 
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500" value="MAINTENANCE" />
                    <span class="label-text">MAINTENANCE</span> 
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500" value="COMPLETE" />
                    <span class="label-text">COMPLETE</span> 
                </label>
            </div>
        </div>

        <!-- PERIODE -->
        <div class="flex gap-3">
            <label class="form-control min-w text-nowrap">
                <div class="label label-text pb-0">Start Date</div>
    
                <DatePicker v-model="formData.startDate" color="gray">
                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25 font-normal">
                            {{ dayjs(formData.startDate).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>
    
                <div class="text-error text-right text-sm p-2" v-if="errors.startDate">{{ errors.startDate }}</div>
            </label>

            <div class="form-control min-w text-nowrap">
                <div class="label label-text pb-0">End Date</div>
                <div class="flex items-center gap-4">
                    <DatePicker v-model="formData.endDate" color="gray">

                        <template #default="{ togglePopover }">
                            <button @click="togglePopover" class="btn btn-outline border-neutral/25 font-normal min-w-32" :disabled="isPresent">
                                {{ isPresent ? '_' : dayjs(formData.endDate).format('D MMMM YYYY') }}
                            </button>
                        </template>
                    </DatePicker>
                    <input type="checkbox" v-model="isPresent" class="checkbox" @change="handlePresent" />PRESENT
                </div>
    
    
                <div class="text-error text-right text-sm p-2" v-if="errors.endDate">{{ errors.endDate }}</div>
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

        <!-- SKILL -->
        <div class="flex gap-2 items-center my-2">
            <div class="label label-text">Skills</div>
            <button class="btn btn-xs btn-neutral" @click="showSkillSelector = true">
                <LucidePlus :size="10" /> Add Skill
            </button>
        </div>
        <div class="card min-h-20 w-full bg-neutral/5 p-4">
            <div class="flex flex-wrap gap-3">
                <button v-for="skill in selectedSkills" :key="skill.id" class="btn btn-neutral btn-sm w-max">
                    <div v-html="skill.svg" class="w-6 h-6"></div>
                    {{ skill.title }}
                </button>
            </div>
        </div>

        <!-- description -->
        <label class="form-control w-full">
            <div class="label label-text pb-0">Description</div>
            <textarea v-model="formData.description" rows="10" class="textarea textarea-primary"
                placeholder="Description"></textarea>
            <div class="text-error text-right text-sm" v-if="errors.description">{{ errors.description }}</div>
        </label>

        <!-- photos -->

        <div class="flex justify-end gap-2 my-4">
            <NuxtLink to="/admin/blogs" class="btn">Cancel</NuxtLink>
            <button @click="showCreateConfirmation = true" class="btn btn-neutral">
                Save
                <ImagesLoading v-show="isLoading" class="w-10" />
            </button>
        </div>
        <div class="text-error text-sm text-right">{{ fetchError }}</div>

    </div>

    <!-- skill selector -->
    <AdminProjectsSkillSelector :show="showSkillSelector" :selected="selectedSkills" @close="showSkillSelector = false" @addSkill = "addSkill" />
    
    <!-- modal confirmation -->
    <AdminModalConfirm :show="showCreateConfirmation" text_save="Save" @close="showCreateConfirmation =  false"
            @saved="handleSave">
            Are you sure to save this new project?
    </AdminModalConfirm>

</template>

<script setup>
import Joi from 'joi';
import dayjs from 'dayjs'
import { DatePicker } from 'v-calendar';

definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const SkillStore = useSkillStore();
onBeforeMount(async () => {
    await SkillStore.getSkillsByCategory(); 
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


// handle present
const isPresent = ref(true);
const handlePresent = (e) => {
    const checked = e.target.checked;
    formData.value.endDate = checked ? null : new Date()
};

const showSkillSelector = ref(false)
const selectedSkills = ref([]);
const addSkill = (skill) => {
    const index = selectedSkills.value.findIndex(s => {
        return s.id == skill.id
    });
    
    if (index == -1) {
        // tambahkan
        selectedSkills.value.push(skill);
    } else {
        // hapus
        selectedSkills.value.splice(index, 1);

    }
}

// handle save
const errors = ref({});
const fetchError = ref('')
const showCreateConfirmation = ref(false)
const isLoading = ref(false)
const ProjectStore = useProjectStore();

const handleSave = async () => {
    // reset
    errors.value = {};
    fetchError.value = '';
    
    try {
        isLoading.value = true;
        const dataSave = { ...formData.value };
    
        // end date jika null, jadikan ''
        if (!dataSave.endDate) dataSave.endDate = ''
        
        // skill -> array of id
        const skills_ids = selectedSkills.value.map(s => s.id)
    
        await ProjectStore.create(dataSave, skills_ids);

        navigateTo('/admin/projects');
    } catch (error) {
        console.log(error)
        showCreateConfirmation.value = false;
        isLoading.value = false;

        if (error instanceof Joi.ValidationError) {
            // joi error
            errors.value = joierror(error);
        } else {
            if (error.data) {
                //fetch error
                fetchError.value = error.data.message;
            } else {
                // code error                    
                console.log(error)
            }
        }
    }
}

</script>