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
            this.educations = await Api.get('/educations');
        },
        async remove(id) {
            console.log(id);
            const Api = useApiStore();
            await Api.delete('/education/' + id);
        },
        async create(data) {
            const Api = useApiStore();

            // validasi
            data = Validate(isEducation, data);

            await Api.post('/education', data);
        }
    }
});