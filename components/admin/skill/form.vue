<template>
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg">{{ data ? `UPDATE: ${data.title}` : 'CREATE SKILL' }}</h3>

            <!-- TITLE -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Title</div>
                <input v-model="formData.title" type="text" placeholder="Title"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title }}</div>
            </label>

            <!-- CATEGORY -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Category</div>
                <input v-model="formData.category" type="text" placeholder="Category"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.category">{{ errors.category }}</div>
            </label>

            <!-- category selector -->
            <div class="flex flex-col">
                <label class="mt-2 text-sm">Select Category</label>
                <select @change="filter = (e) => formData.category = e.target.value"
                    class="select select-sm select-bordered w-full max-w-xs">
                    <option v-for="cat in SkillStore.categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
                </select>
            </div>

            <!-- SVG -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">SVG</div>

                <div v-html="formData.svg" class="w-32 bg-neutral/10 rounded-full p-6 mb-2 mx-auto"></div>

                <textarea v-model="formData.svg" rows="3" class="textarea textarea-primary" placeholder="SVG"></textarea>
                <div class="text-error text-right text-sm" v-if="errors.svg">{{ errors.svg }}</div>
            </label>

            <div class="modal-action">
                <label class="btn" @click="$emit('close')">Close!</label>
                <label @click="save" class="btn btn-neutral">
                    {{ data ? 'Update' : 'Save' }}
                    <ImagesLoading v-show="isLoading" class="w-10" />
                </label>
            </div>
        </div>
        <!-- Click Outside -->
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">Close</label>
        </form>
    </div>
</template>

<script setup>
import Joi from "joi";

const emit = defineEmits(['close', 'saved']);
const props = defineProps({
    data: Object,
    show: Boolean,
    text_save: String
});

const show_modal = ref(false);
const isLoading = ref(false);

const formData = ref({});
const errors = ref({});
const fetchError = ref('');
const isChecked = ref(false);

watchEffect(() => {
    show_modal.value = props.show;

    // reset form
    formData.value = {
        title: '',
        category: '',
        svg: ''
    }

    isChecked.value = props.data ? props.data.endYear == null : false;
});

// handle save 
const SkillStore = useSkillStore();
const save = async () => {
    // reset error 
    errors.value = {};
    fetchError.value = '';

    try {
        // tampilkan loading
        isLoading.value = true;

        // await SkillStore.create(formData.value);
        if (!props.data) {
            await SkillStore.create(formData.value);
        } else {
            await SkillStore.update(props.data.id, formData.value);
        }

        // hide loading indicator
        isLoading.value = false;

        emit('saved')
    } catch (error) {
        // hilangkan loading
        isLoading.value = false;

        if (error instanceof Joi.ValidationError) {
            // Joi error
            errors.value = joierror(error);
        } else {
            if (error.data) {
                // fetch error
                fetchError.value = error.data.message;
            } else {
                console.error(error);
            }
        }
    }
}

</script>