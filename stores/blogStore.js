import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";
import { isCreateBlog } from "~/utils/blogValidation";

export const useBlogStore = defineStore('blog', {
    state: () => ({
        data: null
    }),
    getters: {
        // blogs: (state) => {
        //     if (state) {
        //         // return kalo ada data di state
        //         return state.data
        //     }
        //     // default return
        //     return [];
        // },
        // limit: (state) => {
        //     if (state) {
        //         return state.data.limit
        //     }

        //     // default 
        //     return 10;
        // },
        // maxPage: (state) => {
        //     if (state) {
        //         return state.data.maxPage
        //     }

        //     // default 
        //     return 1;
        // },
        blogs: (state) => state.data ? state.data.data : [],
        limit: (state) => state.data ? state.data.limit : 10,
        maxPage: (state) => state.data ? state.data.maxPage : 1,
        total: (state) => state.data ? state.data.total : 0
    },
    actions: {
        async get(page = 1, search = '') {
            const Api = useApiStore();
            this.data = await Api.get(`/blogs?limit=12&page=${page}&search=${search}`);
        },
        async create(data, photos) {
            const Api = useApiStore();

            data = Validate(isCreateBlog, data);

            // buat FORM DATA 
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);

            // apppend foto dengan loopp
            for (const photo of photos) {
                formData.append("photos", photo)
            }

            await Api.post('/blog', formData);
        },
        async remove(id) {
            const Api = useApiStore();

            await Api.delete('/blog/' + id);
        },
    }
});