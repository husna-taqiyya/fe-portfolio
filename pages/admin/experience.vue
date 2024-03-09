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

        <div class="overflow-x-auto max-lg:hidden">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
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
                        <th>{{ exp.company }}</th>
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

        <div class="lg:hidden flex flex-col gap-2 sm:gap-4">
            <div v-for="exp in dataTable" :key="exp.id" class="card bg-base-100 shadow-xl">
                <div class="card-body max-sm:p-4">
                    <div class="flex justify-between">
                        <div>
                            <div class="font-semibold">Title : {{ exp.title }}</div>
                            <div class="font-semibold">Description : {{ exp.description }}</div>
                            <td class="text-sm">{{ exp.readStartDate }} - {{ exp.readEndDate || 'Present' }}</td>
                        </div>

                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn m-1">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button @click="editData = exp; showForm = true" class="btn btn-sm my-1">
                                        <LucidePencilLine :size="16" />
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button @click="showRemoveModal = true; removeData = exp"
                                        class="btn btn-sm btn-error my-1">
                                        <LucideTrash2 :size="16" />
                                        Remove
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="grid grid-cols-10 gap-3">
                        <button class="col-span-6 btn btn-neutral flex justify-between">
                            <div>Company :</div>
                            <div class="font-normal">{{ exp.company }}</div>
                        </button>
                        <button class="col-span-4 btn btn-neutral flex justify-between">
                            <div>Location :</div>
                            <div class="font-normal">{{ exp.location }}</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- modal confirmation -->
        <LazyAdminModalConfirm :show="showRemoveModal" text_save="Remove" @close="showRemoveModal = false"
            @saved="handleRemove">
            Are you sure to remove
            <span v-if="removeData" class="font-bold">{{ removeData.title }} ?</span>
        </LazyAdminModalConfirm>

        <!-- modal success alert -->
        <LazyAdminModalSuccess :show="showSuccessModal" @close="showSuccessModal = false" />

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

// berhasil create education
const saved = async () => {
    // tutup form
    showForm.value = false;

    // fetch ulang data educations
    await ExpStore.get();
}

const editData = ref(null);

</script>