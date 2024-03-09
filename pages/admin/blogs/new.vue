<template>
    <div>
        <div class="font-semibold text-xl mb-4 pb-2 border-b border-b-neutral">
            <div class="flex items-center gap-2">
                <LucideGraduationCap :size="30" />Create Blog
            </div>
        </div>

        <label class="form-control w-full">
            <div class="label label-text pb-0">Title</div>
            <input v-model="formData.title" type="text" placeholder="Title"
                class="input input-bordered w-full font-bold" />
            <div class="text-error text-right text-sm pr-2" v-if="errors.title">{{ errors.title }}</div>
        </label>

        <div class="my-4">
            <div class="label label-text pb-0">Photos</div>

            <div class="overflow-auto">
                <!-- loop photo preview -->
                <div class="flex flex-nowrap gap-2">
                    <div v-for="(photo, index) in photo_previews" class="min-w-60 relative aspect-video overflow-hidden justify-center items-center rounded bg-neutral/20">
                        <img :src="photo" class="max-h-full max-w-full">
                        
                        <!-- action button -->
                        <div class="dropdown dropdown-end absolute right-0 top-0">
                            <div tabindex="0" role="button" class="btn btn-sm px-1 bg-opacity-70 rounded-md m-1">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button @click="photo_previews.splice(index, 1); file_photos.splice(index, 1)" class="btn btn-sm my-1">
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
            <input @change="handleFile" multiple type="file" accept="image/*" :disabled="photo_previews.length >= 10"
                class="file-input file-input-bordered w-full max-w-xs" />
        </div>

        <label class="form-control w-full">
            <div class="label label-text pb-0">Content</div>
            <textarea v-model="formData.content" rows="10" class="textarea textarea-primary"
                placeholder="Description"></textarea>
            <div class="text-error text-right text-sm" v-if="errors.content">{{ errors.content }}</div>
        </label>

        <div class="flex justify-end gap-2 my-4">
            <NuxtLink to="/admin/blogs" class="btn">Cancel</NuxtLink>
            <button @click="showCreateConfirmation = true" class="btn btn-neutral">Save</button>
        </div>

        <LazyAdminModalConfirm :show="showCreateConfirmation" text_save="Save" @close="showCreateConfirmation =  false"
            @saved="handleSave">
            Are you sure to save this new blog?
        </LazyAdminModalConfirm>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

// const config = useRuntimeConfig();
// const apiUri = config.public.apiUri;

const errors = ref({
    title: '',
    content: ''
});

const formData = ref({
    title: '',
    content: ''
});

// PHOTO PREVIEW
const file_photos = [];
const photo_previews = ref([]);
const handleFile = (e) => {
    for (const file of e.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (photo_previews.value.length < 10) {
                // tampung file
                file_photos.push(file);

                // tampung preview
                photo_previews.value.push(reader.result);
            }
        }
    }

    // reset input file selector
    e.target.value = ''
}


// HANDLE SAVE
const BlogStore = useBlogStore();
const fetchError = ref('');
const isLoading = ref(false);
const showCreateConfirmation = ref(false)
const handleSave = async () => {
    // reset error
    errors.value = {};
    fetchError.value = '';

    // hide confirmation
    showCreateConfirmation.value = false;
    try {
        isLoading.value = true;
        await BlogStore.create(formData.value, file_photos);

        navigateTo('/admin/blogs');

    } catch (error) {
        // reset loading indicator
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