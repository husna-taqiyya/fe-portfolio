import { defineStore } from 'pinia';
import { useApiStore } from './apiStore';

export const useSkillStore = defineStore('skills', {
    state: () => ({
        skills: null,
        categories: []
    }),
    actions: {
        async get() {
            const Api = useApiStore();

            this.skills = await Api.get('/skills');

            // RETURN VOID
        },
        async getCategories() {
            const Api = useApiStore();

            this.categories = await Api.get('/skill_categories');

            // RETURN VOID
        },
    }
});