import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";

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
        }
    }
});