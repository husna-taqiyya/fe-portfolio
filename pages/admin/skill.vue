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

        <div class="overflow-x-auto max-lg:hidden">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
                        <th>SVG</th>
                        <th class="text-center">Title</th>
                        <th class="text-center">Category</th>
                        <th class="text-center">Projects</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody v-if="SkillStore.skills">
                    <!-- row 1 -->
                    <tr v-for="skill in dataTable" :key="skill.id">
                        <th>
                            <div v-html="skill.svg" class="w-8 overflow-hidden"></div>
                        </th>
                        <td class="text-center font-semibold">{{ skill.title }}</td>
                        <td class="text-center text-xs">
                            <span class="badge badge-outline badge-sm border-neutral/25 text-center font-semibold pb-px">{{
                                skill.category.title }}</span>
                        </td>

                        <td class="text-center">{{ skill._count.projects }}</td>
                        <td>
                            <div class="flex justify-center gap-2 max-md:hidden">
                                <button @click="updateData = skill; showForm = true" class="btn btn-circle btn-neutral">
                                    <LucidePencilLine :size="16" />
                                </button>
                                <button v-if="skill._count.projects == 0" @click="showRemoveModal = true; removeData = skill" class="btn btn-circle btn-error">
                                    <LucideTrash2 :size="16" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <AdminSkillSkeletonTable v-else />
            </table>
        </div>

        <!-- MOBILE -->
         <div v-if="SkillStore.skills" class="lg:hidden flex flex-col gap-3 sm:gap-4 pt-5">
            <div v-for="skill in dataTable" :key="skill.id" class="card bg-base-300 shadow-xl">
                <div class="card-body max-sm:p-4">
                    <div class="flex justify-between">
                        <div class="flex gap-4 items-center">
                            <div v-html="skill.svg" class="w-10 overflow-hidden"></div>
                            <div>
                                <td class="font-semibold">{{ skill.title }}</td>
                                <div class="text-sm">{{ skill.category.title }}</div>
                            </div>
                        </div>

                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn m-1">
                                <LucideMoreVertical :size="16" />
                            </div>
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button @click="updateData = skill; showForm = true"
                                        class="btn btn-sm my-1 btn-success">
                                        <LucidePencilLine :size="16" />
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button @click="showRemoveModal = true; removeData = skill"
                                        class="btn btn-sm btn-error my-1">
                                        <LucideTrash2 :size="16" />
                                        Remove
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button class="col-span-4 btn btn-neutral flex justify-between bg-base-300 shadow-lg">
                        <div>Projects :</div>
                        <div class="font-normal">{{ skill._count.projects }}</div>
                    </button>

                </div>
            </div>
        </div>

        <!-- SKELETON MOBILE -->
        <AdminSkillSkeletonMobile v-else />

        <!-- modal confirmation -->
        <LazyAdminModalConfirm :show="showRemoveModal" text_save="Remove" @close="showRemoveModal = false"
            @saved="handleRemove">
            Are you sure to remove
            <span v-if="removeData" class="font-bold">{{ removeData.title }} ?</span>
        </LazyAdminModalConfirm>

        <!-- modal success alert -->
        <LazyAdminModalSuccess :show="showSuccessModal" @close="showSuccessModal = false" />

        <!-- FORM MODAL -->
        <AdminSkillForm :data="updateData" :show="showForm" @close="showForm = false" @saved="saved" />

    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: 'auth'
});

const getData = async () => {
    await Promise.all([
        SkillStore.getCategories(),
        SkillStore.get(),
    ]);
}

const filter = ref('');


const SkillStore = useSkillStore();
onBeforeMount(async () => {
    await getData();
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
                return skill.skillCategoryId == selectedCatID;
            })
        }
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
    // tutup form modal
    showForm.value = false;

    // bukan form success
    showSuccessModal.value = true;

    // fetch ulang data + category
    await getData();
}

</script>