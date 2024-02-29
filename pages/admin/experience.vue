<template>
    <div>
        <div class="font-semibold text-xl mb-4 border-b-neutral/10">
            <div>Experience</div>
        </div>

        <input v-model="filter" type="text" placeholder="Search" class="input input-sm mb-4 input-bordered w-full max-w-xs">

        <div class="overflow-x-auto bg-white">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
                        <th>title</th>
                        <td>company</td>
                        <td>location</td>
                        <td>description</td>
                        <td>Date</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="exp in dataTable" :key="exp.id">
                        <th>{{ exp.title }}</th>
                        <td class="text-center">{{ exp.company }}</td>
                        <td class="text-center">{{ exp.location }}</td>
                        <td class="text-center">{{ exp.description }}</td>
                        <td class="text-center">{{ exp.readStartDate }} - {{ exp.readEndDate }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button @click="showRemoveModal = true; removeData = exp" class="btn btn-error btn-circle">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button @click="showRemoveModal = true; removeData = exp"
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
</script>