<template>
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg">CREATE EDUCATION</h3>

            <!-- INSTITUTION NAME -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Institution Name</div>
                <input v-model="formData.institutionName" type="text" placeholder="Institution Name"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.institutionName">{{ errors.institutionName }}</div>
            </label>
            <!-- MAJOR -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Major</div>
                <input v-model="formData.major" type="text" placeholder="Major"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.major">{{ errors.major }}</div>
            </label>
            <!-- DEGREE -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Degree</div>
                <input v-model="formData.degree" type="text" placeholder="Degree"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.degree">{{ errors.degree }}</div>
            </label>
            <!-- START YEAR -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Start Year</div>
                <input v-model="formData.startYear" type="text" placeholder="Start Year"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.startYear">{{ errors.startYear }}</div>
            </label>
            <!-- END YEAR -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">End Year</div>
                <input v-model="formData.endYear" type="text" placeholder="End Year"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.endYear">{{ errors.endYear }}</div>
            </label>

            <div class="modal-action">
                <label class="btn" @click="$emit('close')">Close!</label>
                <label @click="save" class="btn btn-neutral">
                    {{ text_save || 'Save' }}
                    <span v-show="isLoading" class="loading loading-bars loading-md"></span>
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
    show: Boolean,
    text_save: String
});

const show_modal = ref(false);
const isLoading = ref(false);

const formData = ref({});
const fetchError = ref('');
const errors = ref({});

watchEffect(() => {
    show_modal.value = props.show;

    // reset form
    formData.value = {
        institutionName: '',
        startYear: '',
        endYear: '',
        major: '',
        degree: ''
    }
});

// handle save 
const EduStore = useEducationStore();
const save = async () => {
    // reset error 
    // console.log(formData.value)
    errors.value = {};
    fetchError.value = '';

    try {
        // show loading indicator
        isLoading.value = true;

        // ubah data endYear jika kosong menjadi null
        if (!formData.value.endYear) formData.value.endYear = null;
        // console.log(formData.value.endYear)

        await EduStore.create(formData.value);
        // console.log(EduStore.educations)

        // hide loading indicator
        isLoading.value = false;

        // emit saved
        emit('saved');
    } catch (error) {
        // reset loading indicator
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