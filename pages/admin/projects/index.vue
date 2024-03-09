<template>
    <div class="font-semibold mb-6 pb-2 border-b border-b-neutral flex items-center justify-between">
        <div class="flex items-center gap-2">
            <LucideBriefcase :size="26" /> P R O J E C T S
        </div>
        <NuxtLink to="/admin/projects/new" class="btn btn-neutral">
            <LucidePlus :size="16" /> Add Projects
        </NuxtLink>
    </div>

    <div class="flex max-sm:flex-col max-sm:items-center sm:justify-between gap-2">
        <input @keyup.enter="page = 1; getData()" v-model="filter" type="text" placeholder="Search"
            class="input input-sm input-bordered input-primary w-full sm:max-w-xs" />
        <!-- Pagination -->
        <div class="join">
            <button class="join-item btn btn-sm" @click="prevPage">«</button>
            <button class="join-item btn btn-sm">Page {{ page }} of {{ ProjectStore.maxPage }}</button>
            <button class="join-item btn btn-sm" @click="nextPage">»</button>
        </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pt-5">
        <div v-for="project in ProjectStore.projects" :key="project.id"
            class="card card-compact bg-base-100 shadow-xl overflow-hidden relative">
            <div class="lg:hidden dropdown dropdown-end absolute right-0 top-0">

                <div tabindex="0" role="button" class="btn btn-sm px-1 m-1 btn-opacity-70 rounded-md border-0">
                    <LucideMoreVertical :size="16" />
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <NuxtLink :to="`/admin/projects/update?id=${project.id}`" class="btn btn-sm my-1 btn-success">
                            <LucidePencilLine :size="16" />
                            Edit
                        </NuxtLink>
                    </li>
                    <li>
                        <button @click="removeData = project; showRemoveModal = true;"
                            class="btn btn-sm btn-error my-1">
                            <LucideTrash2 :size="16" />
                            Remove
                        </button>
                    </li>
                </ul>
            </div>

            <div class="card-body flex-none !pb-1">
                <h2 class="card-title max-md:text-sm">{{ project.title }}</h2>
                <div class="flex max-sm:flex-col gap-1 justify-between">
                    <p class="text-xs">{{ project.readStartDate }} - {{ project.readEndDate }}</p>
                    <p class="text-xs font-semibold">{{ project.status }}</p>
                </div>
            </div>

            <figure class="relative">
                <img v-if="project.photos.length" :src="apiUri + project.photos[0].path" />

                <div v-else class="bg-neutral/20 aspect-video w-full"></div>

                <div class="absolute badge left-1 bottom-1" v-if="project.skills.length">
                    {{ project.skills.length }} Skills
                </div>
            </figure>
            <div class="card-body">
                <h2 class="text-md font-semibold" v-if="project.company">{{ project.company }}</h2>
                <p class="line-clamp-2">{{ project.description }}</p>

                <div class="max-lg:hidden flex gap-2 justify-end">
                    <NuxtLink :to="`/admin/projects/update?id=${project.id}`"
                        class="btn btn-xs xl:btn-sm my-1 btn-success">
                        <LucidePencilLine :size="16" />
                        Edit
                    </NuxtLink>
                    <button @click="removeData = project; showRemoveModal = true;"
                        class="btn btn-xs xl:btn-sm btn-error my-1">
                        <LucideTrash2 :size="16" />
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- IF NO DATA -->
    <div v-if="ProjectStore.projects.length == 0" class="flex flex-col items-center my-20">
        <LucideShieldX :size="100" />
        <span class="font-semibold mt-2">No Data</span>
    </div>

    <div class="flex max-sm:flex-col max-sm:items-center sm:justify-end gap-2 pt-5">
        <!-- Pagination -->
        <div class="join">
            <button class="join-item btn btn-sm" @click="prevPage">«</button>
            <button class="join-item btn btn-sm">Page {{ page }} of {{ ProjectStore.maxPage }}</button>
            <button class="join-item btn btn-sm" @click="nextPage">»</button>
        </div>
    </div>

    <!-- Modal confirmation -->
    <LazyAdminModalConfirm :show="showRemoveModal" text_save="remove" @close="showRemoveModal = false"
        @saved="handleRemove">
        Are you sure to remove ?
        <div v-if="removeData" class="font-bold">{{ removeData.title }}</div>
    </LazyAdminModalConfirm>

    <!-- Modal success alert -->
    <LazyAdminModalSuccess :show="showsuccessModal" @close="showsuccessModal = false" />
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const config = useRuntimeConfig()
const apiUri = config.public.apiUri;

const ProjectStore = useProjectStore();
onBeforeMount(async () => {
    await getData();
});

const filter = ref('');
const page = ref(1);
const getData = async () => {
    await ProjectStore.get(page.value, filter.value);
};

const prevPage = async () => {
    if (page.value != 1) {
        // kurangi 1
        page.value = page.value - 1;

        // fetch ulang
        await getData();
    }
}

const nextPage = async () => {
    if (page.value != ProjectStore.maxPage) {
        // tambah 1
        page.value = page.value + 1;

        // fetch ulang
        await getData();
    }
}

// // REMOVE
const removeData = ref(null);
const showRemoveModal = ref(false);
const showsuccessModal = ref(false);
const handleRemove = async () => {
    // prevent remove if no data
    if (!removeData.value) return;

    try {
        // process delete
        await ProjectStore.remove(removeData.value.id);

        // success modal
        showsuccessModal.value = true;

        // hide modal
        showRemoveModal.value = false;
        // refresh data
        await getData();
    } catch (error) {
        console.log(error);
    }
}
</script>
