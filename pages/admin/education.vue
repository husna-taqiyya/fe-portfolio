<template>
    <div>
        <div class="font-semibold mb-6 pb-2 border-b border-b-neutral flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideGraduationCap :size="26" /> E D U C A T I O N
            </div>
            <button @click="editData = null; showForm = true" class="btn btn-neutral">
                <LucidePlus :size="16" /> Add Education
            </button>
        </div>

        <input v-model="filter" type="text" placeholder="Search" class="input input-sm mb-4 input-bordered w-full max-w-xs">

        <div class="overflow-x-auto bg-white">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Institution</th>
                        <th class="text-center">Periode</th>
                        <th class="text-center">Major</th>
                        <th class="text-center">Degree</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="edu in dataTable" :key="edu.id">
                        <th>{{ edu.institutionName }}</th>
                        <td class="text-center">{{ edu.startYear }} - {{ edu.endYear || 'Present' }}</td>
                        <td class="text-center">{{ edu.major }}</td>
                        <td class="text-center">{{ edu.degree }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button @click="editData = edu; showForm = true" class="btn btn-error btn-circle">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button @click="removeData = edu; showRemoveModal = true"
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
            <span v-if="removeData" class="font-bold">{{ removeData.institutionName }} ?</span>
        </AdminModalConfirm>

        <!-- modal success alert -->
        <AdminModalSuccess :show="showSuccessModal" @close="showSuccessModal = false" />

        <!-- FORM MODAL -->
        <AdminEducationForm :data="editData" :show="showForm" text_save="saved" @close="showForm = false" @saved="saved" />

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const EduStore = useEducationStore();
onBeforeMount(async () => {
    await EduStore.get();
});

const filter = ref('');
const dataTable = computed(() => {
    const search = filter.value.toLowerCase();

    if (search != '') {
        return EduStore.educations.filter(edu => {
            // pastikan huruf lower
            const institutionName = edu.institutionName.toLowerCase();
            return institutionName.includes(search);
        });

    } else {
        // return semua data
        return EduStore.educations;
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
        await EduStore.remove(id);

        // hide modal
        showRemoveModal.value = false;

        // success modal
        showSuccessModal.value = true;

        // refresh data
        await EduStore.get();
    } catch (error) {
        console.log(error);
    }
}

// CREATE
const showForm = ref(false);

// berhasil create education
const saved = async () => {
    // tutup form
    showForm.value = false;

    // bukan form success
    showSuccessModal.value = true;

    // fetch ulang data educations
    await EduStore.get();
}

const editData = ref(null);

</script>