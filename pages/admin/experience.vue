<template>
    <div>
        <div class="font-semibold mb-6 pb-2 border-b border-b-neutral flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideBriefcase :size="26" /> E X P E R I E N C E
            </div>
            <button @click="editData = null; showForm = true" class="btn btn-neutral">
                <LucidePlus :size="16" /> Add Experience
            </button>
        </div>

        <input v-model="filter" type="text" placeholder="Search" class="input input-sm mb-4 input-bordered w-full max-w-xs">

        <div class="overflow-x-auto bg-white">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Id</th>
                        <td>company</td>
                        <td class="text-center">title</td>
                        <td>location</td>
                        <td>description</td>
                        <td class="text-center">Date</td>
                        <td class="text-center">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="exp in dataTable" :key="exp.id">
                        <th>{{ exp.id }}</th>
                        <td>{{ exp.company }}</td>
                        <td class="text-center">{{ exp.title }}</td>
                        <td class="text-center">{{ exp.location }}</td>
                        <td class="text-center">{{ exp.description }}</td>
                        <td class="text-center">{{ exp.readStartDate }} - {{ exp.readEndDate }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button @click="editData = exp; showForm = true" class="btn btn-error btn-circle">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button @click="removeData = exp; showRemoveModal = true"
                                    class="btn btn-neutral btn-circle">
                                    <LucideTrash2 :size="16" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- modal confirmation -->
        <AdminModalConfirm :show="showRemoveModal" text_save="Remove" @close="showRemoveModal = false"
            @saved="handleRemove">
            Are you sure to remove
            <span v-if="removeData" class="font-bold">{{ removeData.title }} ?</span>
        </AdminModalConfirm>

        <!-- modal success alert -->
        <AdminModalSuccess :show="showSuccessModal" @close="showSuccessModal = false" />

        <!-- FORM MODAL -->
        <AdminExperienceForm :data="editData" :show="showForm" text_save="saved" @close="showForm = false" @saved="saved" />

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const ExpStore = useExperienceStore();
onBeforeMount(async () => {
    await ExpStore.get();
});

const filter = ref('');
const dataTable = computed(() => {
    const search = filter.value.toLowerCase();

    if (search != '') {
        return ExpStore.experiences.filter(exp => {
            // pastikan huruf lower
            const title = exp.title.toLowerCase();
            return title.includes(search);
        });

    } else {
        // return semua data
        return ExpStore.experiences;
    }
});

// REMOVE 
const removeData = ref(null);
const showRemoveModal = ref(false);
const showSuccessModal = ref(false);
const handleRemove = async () => {
    try {
        const id = removeData.value.id;

        // proses delete
        await ExpStore.remove(id);

        // hide modal
        showRemoveModal.value = false;

        // success modal
        showSuccessModal.value = true;

        // refresh data
        await ExpStore.get();
    } catch (error) {
        console.log(error);
    }
}

// EDIT
const showForm = ref(false);
const editData = ref(null);

// berhasil create education
const saved = async () => {
    // tutup form
    showForm.value = false;

    showSuccessModal.value = true;

    // fetch ulang data educations
    await ExpStore.get();
}

</script>