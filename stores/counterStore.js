import { defineStore } from 'pinia'

// LATIHAN STATE MANAGEMENT WITH PINIA
export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        },
        to10() {
            this.count = 10;
        }
    },
});