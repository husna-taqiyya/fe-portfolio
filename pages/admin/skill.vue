<template>
    <div>
        <div class="font-semibold text-lg mb-4 border-b-neutral/25 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideWrench :size="26" />
                S K I L L S
            </div>
            <button @click="showForm = true" class="btn btn-sm btn-neutral">
                <LucidePlus :size="16" />
                Add Skiil
            </button>
        </div>

        <div class="flex gap-3">
            <input v-model="filter" type="text" placeholder="Search" class="input input-sm input-bordered w-full max-w-xs">

            <!-- category selector -->
            <select v-model="selectedCategory" @change="filter = ''"
                class="select select-sm select-bordered w-full max-w-xs">
                <option value="all">All</option>
                <option v-for="cat in SkillStore.categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
            </select>
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
                    <tr v-for="skill in dataTable">
                        <th>
                            <div v-html="skill.svg" class="w-8"></div>
                        </th>
                        <td class="text-center font-semibold">{{ skill.title }}</td>
                        <td class="text-center tet-xs">
                            <span class="badge badge-outline badge-sm border-neutral/25 text-center font-semibold pb-px">{{
                                skill.category.title }}</span>
                        </td>

                        <td class="text-center">{{ skill._count.projects }}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <button class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button v-if="skill._count.projects == 0" class="btn btn-circle btn-error">
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
        <AdminSkillForm :data="updateData" :show="showForm" @close="showForm = false" @saved="" />

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const showRemoveModal = ref(false);
const showSuccessModal = ref(false);
const removeData = ref(null);

const filter = ref('');
const SkillStore = useSkillStore();
onBeforeMount(async () => {
    await Promise.all([
        SkillStore.get(),
        SkillStore.getCategories()
    ]);
});

// FORM
const showForm = ref(false);
const updateData = ref(null);

// SELECTOR
const selectedCategory = ref('all');

const dataTable = computed(() => {
    // pastikan huruf lower
    const search = filter.value.toLowerCase();
    const selectedCatID = selectedCategory.value;

    if (search != '') {
        // jalankan filter
        return SkillStore.skills.filter(skill => {
            // pastikan huruf lower
            const title = skill.title.toLowerCase();

            if (selectedCatID == 'all') {
                return title.includes(search);
            } else {
                return title.includes(search) && skill.skillCategoryId == selectedCatID;
            }
        });
    } else {
        // return semua data
        if (selectedCatID == 'all') {
            return SkillStore.skills;
        } else {
            // return berdasarkan category id
            return SkillStore.skills.filter(skill => {
                return skill.skillCategoryId == selectedCatID
            })
        }
    }
});

const handleRemove = async () => {
    try {
        const id = removeData.value.id;

        // proses delete
        await SkillStore.remove(id);

        // hide modal
        showRemoveModal.value = false;

        // success modal
        showSuccessModal.value = true;

        // refresh data
        await SkillStore.get();
    } catch (error) {
        console.log(error);
    }
}

// berhasil
const saved = async () => {
    showForm.value = false;

    showSuccessModal.value = true;

    // fetch ulang data education
    await SkillStore.get();
}

</script>