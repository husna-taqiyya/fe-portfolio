<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideWrench :size="26" />
                Skill
            </div>
            <button @click="showForm = true" class="btn btn-sm btn-neutral">
                <LucidePlus :size="16" />
                Add Skiil
            </button>
        </div>

        <div class="flex 0 gap-4">
            <select name="" id="" class="w-60">
                <option value="">All Categories</option>
                <!-- draw categories -->
            </select>
            <div class="w-full">
                <input v-model="filter" type="text" placeholder="Type Here"
                    class="grow input input-sm input-bordered w-full" />
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th class="text-center">SVG</th>
                        <th class="text-center">Title</th>
                        <th class="text-center">Category</th>
                        <th class="text-center">Projects</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="skill in dataTable" :key="skill.id">
                        <th>
                            <div v-html="skill.svg" class="w-8 overflow-hidden"></div>
                        </th>
                        <td class="text-center">{{ skill.title }}</td>
                        <td class="text-center">{{ skill.category.title }}</td>
                        <td class="text-center">{{ skill.projects }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button @click="showRemoveModal = true; removeData = skill"
                                    class="btn btn-circle btn-error">
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
        <AdminEducationForm :show="showForm" text_save="saved" @close="showForm = false" @saved="" />



    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const SkillStore = useSkillStore();
const showRemoveModal = ref(false);
const showSuccessModal = ref(false);
const removeData = ref(null);
const filter = ref('');

onBeforeMount(async () => {
    await SkillStore.get();
});

const dataTable = computed(() => {

    const search = filter.value.toLowerCase();

    if (search != '') {
        // jalankan filter
        return SkillStore.skills.filter(skill => {
            const title = skill.title.toLowerCase();
            return title.includes(search);
        });
    } else {
        // return semua data
        return SkillStore.skills;
    }
});

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
// berhasil
const saved = async () => {
    showForm.value = false;

    showSuccessModal.value = true;

    // fetch ulang data education
    await EduStore.get();
}
</script>