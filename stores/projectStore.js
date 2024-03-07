import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

export const useProjectStore = defineStore('project', {
    state: () => ({
        data: null
    }),
    getters: {
        projects: (state) => state.data ? state.data.data : [],
        limit: (state) => state.data ? state.data.limit : 10,
        maxPage: (state) => state.data ? state.data.maxPage : 1,
        total: (state) => state.data ? state.data.total : 0
    },
    actions: {
        async get(page = 1, search = '') {
            const Api = useApiStore();
            this.data = await Api.get(`/projects?limit=12&page=${page}&search=${search}`);
        },
        // async getById(id) {
        //     const Api = useApiStore();
        //     return Api.get('/project/' + id);
        // },
        // async create(data, photos) {
        //     const Api = useApiStore();

        //     data = Validate(isCreateBlog, data);

        //     // buat FORM DATA 
        //     const formData = new FormData();
        //     formData.append("title", data.title);
        //     formData.append("content", data.content);

        //     // apppend foto dengan loopp
        //     for (const photo of photos) {
        //         formData.append("photos", photo)
        //     }

        //     await Api.post('/blog', formData);
        // },
        // async update(id, data, new_photos) {
        //     const Api = useApiStore();

        //     data = Validate(isUpdateBlog, data);

        //     console.log(data)

        //     // buat FORM DATA
        //     const formData = new FormData();
        //     formData.append('title', data.title);
        //     formData.append('content', data.content);

        //     // append photo lama by looping
        //     for (let i = 0; i < data.photos.length; i++) {
        //         const id = data.photos[i];
        //         formData.append(`photos${i}`, id)

        //         console.log(formData.get(`photos[${i}]`))
        //     }

        //     console.log(formData.get('title'))
        //     console.log(formData.get('content'))

        //     // append photo baru
        //     for (const photo of new_photos) {
        //         formData.append('photos', photo)
        //     }

        //     await Api.put(`/blog/${id}`, formData);

        // },
        async remove(id) {
            const Api = useApiStore();

            await Api.delete('/project/' + id);
        }
    }
});