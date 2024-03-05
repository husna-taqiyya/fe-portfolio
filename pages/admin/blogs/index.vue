<template>
    <div>
        <div class="font-semibold mb-6 pb-2 border-b border-b-neutral flex items-center justify-between">
            <div class="flex items-center gap-2">
                <LucideGraduationCap :size="26" /> B L O G S
            </div>
            <button @click="" class="btn btn-neutral">
                <LucidePlus :size="16" /> Add Blog
            </button>
        </div>

        <div class="flex max-sm:flex-col max-sm:items-center sm:justify-between">
            <input @keyup.enter="page = 1; getData()" v-model="filter" type="text" placeholder="Search" class="input input-sm mb-4 input-bordered w-full sm:max-w-xs">
            <div class="join mb-2">
                <button class="join-item btn" @click="prevPage">«</button>
                <button class="join-item btn">Page {{ page }} of {{ BlogStore.maxPage }}</button>
                <button class="join-item btn" @click="nextPage">»</button>
            </div>
        </div>

        <div class="grid grid-cols-4 gap-6">
            <div v-for="blog in BlogStore.blogs"  :key="blog.id" class="card card-compact bg-base-100 shadow-xl">
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
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const BlogStore = useBlogStore();

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

</script>