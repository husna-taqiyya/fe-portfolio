<template>
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x Corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg">{{ data ? `UPDATE: ${data.title}` : 'CREATE EXPERIENCE' }}</h3>

            <!-- TITLE -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Title</div>
                <input v-model="formData.title" type="text" placeholder="Title"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.title">{{ errors.title }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Company</div>
                <input v-model="formData.company" type="text" placeholder="Company"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.company">{{ errors.company }}</div>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">location</div>
                <input v-model="formData.location" type="text" placeholder="location"
                    class="input input-bordered w-full max-w-xs">
                <div class="text-error text-right text-sm" v-if="errors.location">{{ errors.location }}</div>
            </label>
            <!-- DESCRIPTION -->
            <label class="form-control w-full max-w-xs">
                <div class="label label-text">Description</div>
                <textarea v-model="formData.description" rows="3" class="textarea textarea-primary"
                    placeholder="Description"></textarea>
                <div class="text-error text-right text-sm" v-if="errors.description">{{ errors.description }}</div>
            </label>
            <!-- START DATE -->
            <label class="form-control w-full">
                <div class="label label-text pb-0">Start Date</div>

                <DatePicker v-model="formData.startDate" color="gray">
                    <template #default="{ togglePopover }">
                        <button @click="togglePopover" class="btn btn-outline border-neutral/25 font-normal w-40">
                            {{ dayjs(formData.startDate).format('D MMMM YYYY') }}
                        </button>
                    </template>
                </DatePicker>

                <div class="text-error text-right text-sm p-2" v-if="errors.startDate">{{ errors.dob }}</div>
            </label>
            <!-- END DATE -->
            <label class="form-control w-full">
                <div class="label label-text pb-0">End Date</div>

                <div class="flex items-center gap-3 max-x-xs">
                    <DatePicker v-model="formData.endDate" color="gray">
                        <template #default="{ togglePopover }">
                            <button @click="togglePopover" class="btn btn-outline border-neutral/25 font-normal w-40">
                                {{ dayjs(formData.endDate).format('D MMMM YYYY') }}
                            </button>
                        </template>
                    </DatePicker>
                    <input type="checkbox" v-model="isPresent" class="checkbox" @change="handlePresent" /> PRESENT
                </div>

                <div class="text-error text-right text-sm p-2" v-if="errors.endDate">{{ errors.dob }}</div>
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
import dayjs from 'dayjs';
import { DatePicker } from 'v-calendar';
const emit = defineEmits(['close', 'saved']);

const props = defineProps({
    data: Object,
    show: Boolean,
    text_save: String
});

const show_modal = ref(false);
const isLoading = ref(false);

const formData = ref({});
const fetchError = ref('');
const errors = ref({});
const isPresent = ref(false);

watchEffect(() => {
    show_modal.value = props.show;

    // reset form
    formData.value = {
        company: props.data ? props.data.company : '',
        title: props.data ? props.data.title : '',
        location: props.data ? props.data.location : '',
        description: props.data ? props.data.description : '',
        startDate: props.data ? new Date(props.data.startDate) : new Date(),
        endDate: props.data
            ? props.data.endDate != null ? new Date(props.data.endDate) : new Date()
            : new Date()
        // kondisi 1: props.data = null
        // kondisi 2: props.data.endDate = null
    };

    // set isPresent
    if (props.data) {
        // tergantung kondisi endData
        isPresent.value = props.data.endDate == null;
    } else {
        isPresent.value = false;
    }
});
// handle present
const handlePresent = (e) => {
    // ambil value, tercentang atau tidak
    isPresent.value = e.target.checked;
}

// handle save 
const ExpStore = useExperienceStore();
const save = async () => {
    // reset error 
    errors.value = {};
    fetchError.value = '';

    try {
        // show loading indicator
        isLoading.value = true;

        // jika isPresent tercentang
        if (isPresent.value) {
            // ubah endDate menjadi null
            formData.value.endDate = null
        }

        if (!props.data) {
            // jika tidak ada -> create
            await ExpStore.create(formData.value);
        } else {
            // update
            const id = props.data.id;
            await ExpStore.update(id, formData.value);
        }
        // if (!props.data) {
        //     await ExpStore.create(formData.value);
        // } else {
        //     await ExpStore.update(props.data.id, formData.value);
        // }

        // hide loading indicator
        isLoading.value = false;

        // emit saved
        emit('saved');
    } catch (error) {
        console.log(error)
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
