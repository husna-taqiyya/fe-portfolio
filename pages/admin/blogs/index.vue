<template>
    <div>
        <div class="font-semibold mb-6 pb-2 border-b border-b-neutral flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideGraduationCap :size="26" /> B L O G S
            </div>
            <NuxtLink to="/admin/blogs/new" class="btn btn-neutral">
                <LucidePlus :size="16" /> Add Blog
            </NuxtLink>
        </div>

        <div class="flex max-sm:flex-col max-sm:items-center sm:justify-between">
            <input @keyup.enter="page = 1; getData()" v-model="filter" type="text" placeholder="Search" class="input input-sm mb-4 input-bordered w-full sm:max-w-xs">
            <div class="join mb-2">
                <button class="join-item btn" @click="prevPage">«</button>
                <button class="join-item btn">Page {{ page }} of {{ BlogStore.maxPage }}</button>
                <button class="join-item btn" @click="nextPage">»</button>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="blog in BlogStore.blogs"  :key="blog.id" class="card card-compact bg-base-100 shadow-xl overflow-hidden relative">
                <div class=" lg:hidden dropdown dropdown-end absolute right-0 top-0">
                    <div tabindex="0" role="button" class="btn btn-sm px-1 bg-opacity-70 rounded-md m-1">
                        <LucideMoreVertical :size="16" />
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button @click="" class="btn btn-sm btn-primary my-1">
                                <LucidePencilLine :size="16" />
                                Edit
                            </button>
                        </li>
                        <li>
                            <button @click="removeData = blog; showRemoveModal = true;" class="btn btn-sm btn-error my-1">
                                <LucideTrash2 :size="16" />
                                Remove
                            </button>
                        </li>
                    </ul>
                </div>
                <figure>
                    <!-- kalau ada fotonya minimal 1 -->
                    <img v-if="blog.photos.length" :src="apiUri + blog.photos[0].path" />
                    
                    <!-- dummy photo -->
                    <div v-else class="bg-neutral/20 aspect-video w-full"></div>
                    
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ blog.title }}</h2>
                    <p class="line-clamp-2 xl:line-clamp-3">{{ blog.content }}</p>
                </div>
                <div class="max-lg:hidden flex gap-2 justify-end">
                    <NuxtLink :to="`/admin/blogs/update?id=${blog.id}`" @click="" class="btn btn-primary btn-xs xl:btn-sm my-1">
                        <LucidePencilLine :size="16" />
                        Edit
                    </NuxtLink>
                    <button @click="removeData = blog; showRemoveModal = true;" class="btn btn-sm btn-error my-1">
                        <LucideTrash2 :size="16" />
                        Remove
                    </button>
                </div>
            </div>
        </div>
        <div v-if="BlogStore.blogs.length == 0" class="flex flex-col items-center my-20">
            <!-- foto class="w-40 lg:w-60" -->
            <ImagesEmpty class="w-60 lg:w-60"/>
            <span class="font-semibold mt-2">No Data</span>
        </div>

        <div class="flex justify-end mt-2">
            <div class="join mb-2">
                <button class="join-item btn" @click="prevPage">«</button>
                <button class="join-item btn">Page {{ page }}</button>
                <button class="join-item btn" @click="nextPage">»</button>
            </div>
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

const BlogStore = useBlogStore();
const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

onBeforeMount(async() => {
    await getData();
});


const page = ref(1);
const filter = ref('');

const getData = async () =>{
    await BlogStore.get(page.value, filter.value);
}

const prevPage = async () => {
    if(page != 1) {
        // kurangi 1
        page.value = page.value - 1;

        // fetch ulang
        await getData();
    }
}

const nextPage = async () => {
    if(page.value != BlogStore.maxPage) {
        // kurangi 1
        page.value = page.value + 1;

        // fetch ulang
        await getData();
    }
}

// REMOVE
const remove =async (id) => {
    try {
        // do remove
        await BlogStore.remove(id);

        // load ulang data
        await getData();
    } catch (error) {
        console.log(error);        
    }
}

// REMOVE 
const removeData = ref(null);
const showRemoveModal = ref(false);
const showSuccessModal = ref(false);
const handleRemove = async () => {
    try {
        // proses delete
        await BlogStore.remove(removeData.value.id);

        // hide modal
        showRemoveModal.value = false;

        // success modal
        showSuccessModal.value = true;

        // refresh data
        await getData();
    } catch (error) {
        console.log(error);
    }
}

</script>