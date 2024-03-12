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

        <input v-model="filter" type="text" placeholder="Search"
            class="input input-sm input-bordered input-primary w-full max-w-xs" />

        <div class="overflow-x-auto max-lg:hidden">
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
                <tbody v-if="EduStore.educations">
                    <!-- row 1 -->
                    <tr v-for="edu in dataTable" :key="edu.id">
                        <th>{{ edu.institutionName }}</th>
                        <td class="text-center">{{ edu.startYear }} - {{ edu.endYear || 'Present' }}</td>
                        <td class="text-center">{{ edu.major }}</td>
                        <td class="text-center">{{ edu.degree }}</td>
                        <td>
                            <div class="flex gap-2 justify-center">
                                <button @click="editData = edu; showForm = true" class="btn btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button class="btn btn-error" @click="showRemoveModal = true; removeData = edu">
                                    <LucideTrash2 :size="16" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <AdminEducationSkeletonTable v-else />
            </table>
        </div>

        <!-- MOBILE -->
        <div v-if="EduStore.educations" class="lg:hidden flex flex-col gap-2 sm:gap-4 pt-5">
            <div v-for="edu in dataTable" :key="edu.id" class="card bg-base-100 shadow-xl">
                <div class="card-body max-sm:p-4">
                    <div class="flex justify-between">
                        <div>
                            <div class="font-semibold">Period : {{ edu.institutionName }}</div>
                            <td class="text-sm">{{ edu.startYear }} - {{ edu.endYear || 'Present' }}</td>
                        </div>

                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn m-1">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button @click="editData = edu; showForm = true" class="btn btn-sm my-1">
                                        <LucidePencilLine :size="16" />
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button @click="showRemoveModal = true; removeData = edu"
                                        class="btn btn-sm btn-error my-1">
                                        <LucideTrash2 :size="16" />
                                        Remove
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="grid grid-cols-10 gap-3">
                        <button
                            class="col-span-6 btn btn-neutral flex justify-between bg-base-300 shadow-lg">
                            <div>Major:</div>
                            <div class="font-normal">{{ edu.major }}</div>
                        </button>
                        <button
                            class="col-span-4 btn btn-neutral flex justify-between bg-base-300 shadow-lg">
                            <div>Degree:</div>
                            <div class="font-normal">{{ edu.degree }}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- SKELETON MOBILE -->
        <AdminEducationSkeletonMobile v-else />

        <!-- modal confirmation -->
        <LazyAdminModalConfirm :show="showRemoveModal" text_save="remove" @close="showRemoveModal = false"
            @saved="handleRemove">
            Are you sure to remove ?
            <div v-if="removeData" class="font-bold">{{ removeData.institutionName }} ?</div>
        </LazyAdminModalConfirm>

        <!-- modal success alert -->
        <LazyAdminModalSuccess :show="showSuccessModal" @close="showSuccessModal = false" />

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