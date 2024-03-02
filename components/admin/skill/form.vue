<template>
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg">{{ data ? `UPDATE: ${data.institutionName}` : 'CREATE EDUCATION' }}</h3>

            <div class="modal-action">
                <label class="btn" @click="$emit('close')">Close!</label>
                <label @click="" class="btn btn-neutral">
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
    formData.value = {}

    isChecked.value = props.data ? props.data.endYear == null : false;
});

// handle Present
const handlePresent = (e) => {
    // ambil value, tercentang atau tdk
    isChecked.value = e.target.checked;

    if (isChecked.value) {
        formData.value.endYear = '';
    }
}

// handle save 
const SkiStore = useSkillStore();
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

        if (!props.data) {
            await SkiStore.create(formData.value);
        } else {
            await SkiStore.update(props.data.id, formData.value);
        }

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