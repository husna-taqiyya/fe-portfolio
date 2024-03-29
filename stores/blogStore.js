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

            const response = await Promise.all([
                Api.get(`/blogs?limit=12&page=${page}&search=${search}`),
                delay
            ]);

            this.data = response[0];
        },
        async getById(id) {
            const Api = useApiStore();
            return Api.get('/blog/' + id);
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
        async update(id, data, new_photos) {
            const Api = useApiStore();

            data = Validate(isUpdateBlog, data);

            // buat FORM DATA
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);

            // append photo lama by looping
            for (let i = 0; i < data.photos.length; i++) {
                const id = data.photos[i];
                formData.append(`photos${i}`, id)
            }

            // append photo baru
            for (const photo of new_photos) {
                formData.append('photos', photo)
            }

            // await Api.put(`/blog/${id}`, formData);
            await Api.put("/blog/" + id, formData);

        },
        async remove(id) {
            const Api = useApiStore();

            await Api.delete('/blog/' + id);
        }
    }
});