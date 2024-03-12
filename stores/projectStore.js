import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useProjectStore = defineStore('project', {
    state: () => ({
        data: null
        // data: {data: [], total: 10, maxPage: 2}
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

            const response = await Promise.all([
                Api.get(`/projects?limit=12&page=${page}&search=${search}`),
                delay
            ]);

            this.data = response[0];
        },
        async getById(id) {
            const Api = useApiStore();
            return Api.get('/project/' + id);
        },
        async create(data, skills, photos) {
            const Api = useApiStore();

            data = Validate(isCreateProject, data);

            // buat FORM DATA
            const formData = new FormData();
            // key => value
            const array_keys = Object.keys(data);
            for (const key of array_keys) {
                // append by key and value
                formData.append(key, data[key]);
            }

            for (let i = 0; i < skills.length; i++) {
                const id = skills[i];

                formData.append(`skills[${i}]`, id)
            }

            // append foto dengan loop
            for (const photo of photos) {
                formData.append('photos', photo)
            }

            await Api.post('/project', formData);
        },
        async update(id, data, skills, photos) {
            const Api = useApiStore();

            // validasi
            data = Validate(isCreateProject, data);

            // photo lama 
            const old_photos = data.photos;
            delete data.photos

            // buat FORM DATA
            const formData = new FormData();

            // key => value
            const array_keys = Object.keys(data);
            for (const key of array_keys) {
                // append by key and value
                formData.append(key, data[key]);
            }

            // append old photos
            for (let i = 0; i < old_photos.length; i++) {
                const photo_id = old_photos[i];
                formData.append(`photos[${i}]`, photo_id)
            }

            for (let i = 0; i < skills.length; i++) {
                const id = skills[i];

                formData.append(`skills[${i}]`, id)
            }

            // append foto baru
            for (const photo of photos) {
                formData.append('photos', photo);
            }

            console.log("formData")
            console.log(formData)
            await Api.put(`/project/${id}`, formData)
        },
        async remove(id) {
            const Api = useApiStore();

            await Api.delete('/project/' + id)
        },
    }
});