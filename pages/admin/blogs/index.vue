<template>
    <div class="font-semibold mb-6 pb-2 border-b border-b-neutral flex items-center justify-between">
        <div class="flex items-center gap-2">
            <LucideGraduationCap :size="26" /> B L O G S
        </div>
        <NuxtLink to="/admin/blogs/new" class="btn btn-neutral">
            <LucidePlus :size="16" /> Add Blogs
        </NuxtLink>
    </div>

    <div v-if="BlogStore.data != null">
    <!-- <div v-if="false"> -->
        <div class="flex max-sm:flex-col max-sm:items-center sm:justify-between gap-2">
            <input @keyup.enter="page = 1; getData()" v-model="filter" type="text" placeholder="Search"
                class="input input-sm input-bordered input-primary w-full sm:max-w-xs" />
            <!-- Pagination -->
            <div class="join">
                <button class="join-item btn btn-sm" @click="prevPage">«</button>
                <button class="join-item btn btn-sm">Page {{ page }} of {{ BlogStore.maxPage }}</button>
                <button class="join-item btn btn-sm" @click="nextPage">»</button>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pt-5">
            <div v-for="blog in BlogStore.blogs" :key="blog.id" class="card card-compact bg-base-100 shadow-xl">
                <div class="xl:hidden dropdown dropdown-end absolute right-0 top-0">
                    <div tabindex="0" role="button" class="btn btn-sm px-1 m-1 btn-opacity-70 rounded-md border-0">
                        <LucideMoreVertical :size="16" />
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <NuxtLink :to="`/admin/blogs/update?id=${blog.id}`" class="btn btn-sm my-1 btn-success">
                                <LucidePencilLine :size="16" />
                                Edit
                            </NuxtLink>
                        </li>
                        <li>
                            <button @click="removeData = blog; showRemoveModal = true;"
                                class="btn btn-sm btn-error my-1">
                                <LucideTrash2 :size="16" />
                                Remove
                            </button>
                        </li>
                    </ul>
                </div>

                <figure class="relative">
                    <!-- kalau ada foto minimal 1 -->
                    <div v-if="blog.photos.length" class="aspect-video flex justify-center items-center bg-neutral/10">
                        <img :src="apiUri + blog.photos[0].path" class="max-h-full max-w-full" />
                    </div>
                    <!-- dummy photo -->
                    <div v-else class="bg-neutral/20 aspect-video w-full flex justify-center items-center">
                        <!-- <ImagesDummyImage class="w-28 max-h-full max-w-full" /> -->
                    </div>
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ blog.title }}</h2>
                    <p class="line-clamp-2 xl:line-clamp-3">{{ blog.content }}</p>

                    <div class="max-lg:hidden flex gap-2 justify-end">
                        <NuxtLink :to="`/admin/blogs/update?id=${blog.id}`"
                            class="btn btn-xs xl:btn-sm my-1 btn-success">
                            <LucidePencilLine :size="16" />
                            Edit
                        </NuxtLink>
                        <button @click="removeData = blog; showRemoveModal = true;"
                            class="btn btn-xs xl:btn-sm btn-error my-1">
                            <LucideTrash2 :size="16" />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="BlogStore.blogs.length == 0" class="flex flex-col items-center my-20">
            <LucideShieldX :size="100" />
            <span class="font-semibold mt-2">No Data</span>
        </div>

        <div class="flex max-sm:flex-col max-sm:items-center sm:justify-between gap-2 pt-5">
            <!-- Pagination -->
            <div class="join">
                <button class="join-item btn btn-sm" @click="prevPage">«</button>
                <button class="join-item btn btn-sm">Page {{ page }} of {{ BlogStore.maxPage }}</button>
                <button class="join-item btn btn-sm" @click="nextPage">»</button>
            </div>
        </div>
    </div>

    <!-- SKELETON -->
    <AdminBlogSkeletonTable v-else />

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

const BlogStore = useBlogStore();
onBeforeMount(async () => {
    await getData();
});

const filter = ref('');
const page = ref(1);
const getData = async () => {
    await BlogStore.get(page.value, filter.value);
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
    if (page.value != BlogStore.maxPage) {
        // tambah 1
        page.value = page.value + 1;

        // fetch ulang
        await getData();
    }
}

// REMOVE
const removeData = ref(null);
const showRemoveModal = ref(false);
const showsuccessModal = ref(false);
const handleRemove = async () => {
    // prevent remove if no data
    if (!removeData.value) return;

    try {
        // process delete
        await BlogStore.remove(removeData.value.id);

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

// // CREATE
// const showForm = ref(false);

// // berhasil create blog
// const saved = async () => {
//     // tutup form
//     showForm.value = false;

//     // fetch ulang data blog
//     await BlogStore.get();
// }

// EDIT
// const editData = ref(null);
</script>
