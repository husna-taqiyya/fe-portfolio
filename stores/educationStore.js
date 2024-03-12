import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";
import { isEducation } from "~/utils/educationValidation";

export const useEducationStore = defineStore('education', {
    state: () => ({
        educations: null
    }),
    actions: {
        async get() {
            const Api = useApiStore();

            const delayMinimal = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 4000);
            });

            const response = await Promise.all([
                Api.get('/educations'),
                delayMinimal
            ]);

            this.educations = response[0];
        },
        async remove(id) {
            const Api = useApiStore();
            await Api.delete('/education/' + id);
        },
        async create(data) {
            const Api = useApiStore();

            // validasi
            data = Validate(isEducation, data);

            await Api.post('/education', data);
        },
        async update(id, data) {
            const Api = useApiStore();

            // validasi
            data = Validate(isEducation, data);

            await Api.put(`/education/${id}`, data);
        }
    }
});