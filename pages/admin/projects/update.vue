<template>
    <div v-if="data">
        <div class="font-semibold mb-6 pb-2 border-b border-b-neutral flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideBriefcase :size="26" /> U P D A T E _ P R O J E C T: "{{ data.title }}"
            </div>
        </div>

        <!-- TITLE -->
        <label class="form-control w-full">
            <div class="label label-text">Title</div>
            <input v-model="formData.title" type="text" placeholder="Title" class="input input-bordered w-full">
            <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title }}</div>
        </label>

        <!-- PHOTOS -->
        <div class="my-4">
            <div class="label label-text pb-0">Photos</div>

            <div class="overflow-auto">
                <!-- loop photo preview -->
                <div class="flex flex-nowrap overflow-x-auto gap-2">
                    <div v-for="(photo, i) in photo_previews" :key="(photo, i)"
                        class="min-w-60 max-w-60 aspect-video rounded-lg overflow-hidden bg-neutral/10 flex justify-center items-center relative">
                        <img :src="photo.path" class="max-h-full max-w-full">

                        <!-- action button -->
                        <div class="dropdown dropdown-end absolute right-0 top-0">
                            <div tabindex="0" role="button"
                                class="btn btn-sm px-1 m-1 btn-opacity-70 rounded-md border-0">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button @click="photo_previews.splice(index, 1); file_photos.splice(index, 1)"
                                        class="btn btn-sm btn-error my-1">
                                        <LucideTrash2 :size="16" />
                                        Remove
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- dummy -->
                    <div v-if="!photo_previews.length" class="h-32 lg:h-40 aspect-video rounded bg-neutral/20"></div>
                </div>
            </div>

            <div class="pt-5">
                <input @change="handleFile" type="file" multiple accept="image/*" :disabled="photo_previews.length >= 10"
                    class="file-input file-input-bordered w-full max-w-xs" />
            </div>
        </div>

        <!-- PERIODE -->
        <div class="flex gap-3">
            <div class="form-control w-min text-nowrap">
                <div class="label label-text pb-0">Start Date</div>
                <DatePicker v-model="formData.startDate" color="gray">
                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25 font-normal">
                            {{ dayjs(formData.startDate).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>
            </div>
            <div class="form-control w-min min-w-20 text-nowrap">
                <div class="label label-text pb-0">End Date</div>
                <div class="flex items-center gap-3">
                    <DatePicker v-model="formData.endDate" color="gray">

                        <template #default="{ togglePopover }">
                            <button @click="togglePopover"
                                class="btn btn-outline border-neutral/25 font-normal min-w-32" :disabled="isPresent">
                                {{ isPresent ? '-' : dayjs(formData.endDate).format('D MMMM YYYY') }}
                            </button>
                        </template>
                    </DatePicker>
                    <input type="checkbox" v-model="isPresent" class="checkbox" @change="handlePresent" /> PRESENT
                </div>
            </div>
        </div>

        <!-- STATUS -->
        <div class="label label-text pb-0">Status Project</div>
        <div class="flex gap-4">
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500"
                        value="ON_PROGRESS" checked />
                    <span class="label-text">ON_PROGRESS</span>
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500"
                        value="MAINTENANCE" checked />
                    <span class="label-text">MAINTENANCE</span>
                </label>
            </div>
            <div class="form-control">
                <label class="label cursor-pointer flex justify-start gap-2">
                    <input v-model="formData.status" type="radio" name="status" class="radio checked:bg-red-500"
                        value="COMPLETE" checked />
                    <span class="label-text">COMPLETE</span>
                </label>
            </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-2">
            <!-- COMPANY -->
            <label class="form-control w-full">
                <div class="label label-text">Company</div>
                <input v-model="formData.company" type="text" placeholder="Company" class="input input-bordered w-full">
                <div class="text-error text-right text-sm" v-if="errors.company">{{ errors.company }}</div>
            </label>

            <!-- URL -->
            <label class="form-control w-full">
                <div class="label label-text">Url</div>
                <input v-model="formData.url" type="text" placeholder="Url" class="input input-bordered w-full">
                <div class="text-error text-right text-sm" v-if="errors.url">{{ errors.url }}</div>
            </label>

            <!-- GITHUB -->
            <label class="form-control w-full">
                <div class="label label-text">Github</div>
                <input v-model="formData.github" type="text" placeholder="Github" class="input input-bordered w-full">
                <div class="text-error text-right text-sm" v-if="errors.github">{{ errors.github }}</div>
            </label>

            <!-- GITLAB -->
            <label class="form-control w-full">
                <div class="label label-text">Gitlab</div>
                <input v-model="formData.gitlab" type="text" placeholder="Gitlab" class="input input-bordered w-full">
                <div class="text-error text-right text-sm" v-if="errors.gitlab">{{ errors.gitlab }}</div>
            </label>
        </div>

        <!-- SKILL -->
        <div class="flex gap-2 items-center my-2">
            <div class="label label-text">Skills</div>
            <button class="btn btn-xs btn-neutral" @click="showSkillSelector = true">
                <LucidePlus :size="10" /> Add Skill
            </button>
        </div>
        <div class="card min-h-20 w-full bg-neutral/10 p-4">

            <div class="flex flex-wrap gap-2">
                <button v-for="skill in selectedSkill" :key="skill.id" class="btn btn-neutral btn-sm w-max">
                    <div v-html="skill.svg" class="w-6 h-6"></div>
                    {{ skill.title }}
                </button>
            </div>
        </div>

        <!-- DESCRIPTION -->
        <label class="form-control w-full">
            <div class="label label-text">Description</div>
            <textarea v-model="formData.description" type="text" placeholder="Description"
                class="textarea textarea-bordered h-52"></textarea>
            <div class="text-error text-right text-sm" v-if="errors.description">{{ errors.description }}</div>
        </label>
    </div>

    <!-- photos -->

    <div class="flex justify-end gap-2 my-4">
        <NuxtLink to="/admin/projects" class="btn">Cancel</NuxtLink>
        <button @click="showCreateConfirmation = true" class="btn btn-neutral">
            Save
            <ImagesLoading v-show="isLoading" class="w-10" />
        </button>
        <!-- <div class="text-error text-right text-sm" v-if="fetchError">{{ fetchError }}</div> -->
    </div>

    <!-- skill selector -->
    <LazyAdminProjectsSkillSelector :show="showSkillSelector" @close="showSkillSelector = false" :selected="selectedSkill"
        @addSkill="addSkill" />

    <!-- Modal confirmation -->
    <LazyAdminModalConfirm :show="showCreateConfirmation" text_save="save" @close="showCreateConfirmation = false"
        @saved="handleSave">
        Are you sure to save this new Project ?
    </LazyAdminModalConfirm>
</template>


<script setup>
import Joi from 'joi';
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';

definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const ProjectStore = useProjectStore();

// check query
const route = useRoute();
const { id } = route.query;

const data = await ProjectStore.getById(id);

const SkillStore = useSkillStore();
onBeforeMount(async () => {
    await SkillStore.getSkillsByCategory();
})

const formData = ref({
    title: data.title || '',
    description: data.description || '',
    startDate: data.startDate || new Date(),
    endDate: data.endDate || new Date(),
    status: data.status || 'ON_PROGRESS',
    url: data.url || '',
    github: data.github || '',
    gitlab: data.gitlab || '',
    company: data.company || ''
});

// handle present
const isPresent = ref(true);
const handlePresent = (e) => {
    const checked = e.target.checked;
    formData.value.endDate = checked ? null : new Date()
};

// SKILLS
const showSkillSelector = ref(false);
const selectedSkill = ref(data.skills);
const addSkill = (skill) => {
    const index = selectedSkill.value.findIndex(s => {
        return s.id == skill.id;
    });

    if (index == -1) {
        // tambahkan
        selectedSkill.value.push(skill);
    } else {
        selectedSkill.value.splice(index, 1);
    }
};

// map photo
const current_photos = data.photos.map(photo => {
    return {
        path: apiUri + photo.path,
        id: photo.id
    }
});

// PHOTO PREVIEW
const file_photos = [];
const photo_previews = ref(current_photos);
const handleFile = (e) => {
    for (const file of e.target.files) {

        // convert file to data url
        // data yang bisa dibaca di tag <img src= />
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (photo_previews.value.length < 10) {
                // tampung photo
                file_photos.push(file);

                // tampung preview
                photo_previews.value.push({
                    path: reader.result
                    // tanpa id karena foto baru
                });
            }
        }
    }

    // reset input file selected
    e.target.value = ''
}

// handle save
const fetchError = ref('');
const errors = ref({});
const showCreateConfirmation = ref(false);
const isLoading = ref(false);

const handleSave = async () => {
    // reset error
    errors.value = {};
    fetchError.value = '';

    // hide confirmation
    showCreateConfirmation.value = false;

    try {
        isLoading.value = true;
        const dataUpdate = { ...formData.value };

        // endDate jika null jadikan ''`
        if (!dataUpdate.endDate) dataUpdate.endDate;

        // tambahin foto lama
        dataUpdate.photos = [];
        for (const p of photo_previews.value) {
            if (p.id != undefined) {
                dataUpdate.photos.push(p.id);
            }
        }

        // skill => array of id
        const skill_ids = selectedSkill.value.map(s => s.id);

        console.log("masuk save")
        await ProjectStore.update(id, dataUpdate, skill_ids, file_photos);

        navigateTo('/admin/projects');
    } catch (error) {
        isLoading.value = false;
        // reset loading indicator
        showCreateConfirmation.value = false;

        if (error instanceof Joi.ValidationError) {
            // joi error
            errors.value = joiError(error);
        } else {
            if (error.data) {
                // fetch error
                fetchError.value = error.data.message;
            } else {
                // code error
                console.log(error);
            }
        }
    }
};


</script>
