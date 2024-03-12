import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";
import { isExperience } from "~/utils/experienceValidation";

export const useExperienceStore = defineStore('experience', {
    state: () => ({
        experiences: null
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
                Api.get('/experiences'),
                delayMinimal
            ]);

            this.experiences = response[0];
        },
        async remove(id) {
            // console.log(id);
            const Api = useApiStore();
            await Api.delete('/experience/' + id);
        },
        async create(data) {
            const Api = useApiStore();
            // validasi
            data = Validate(isExperience, data);

            await Api.post('/experience', data);

        },
        async update(id, data) {
            const Api = useApiStore();

            // validasi
            data = Validate(isExperience, data);

            await Api.put(`/experience/${id}`, data);
        }
    }
});