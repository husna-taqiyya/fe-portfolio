<template>
    <div>
        ini halaman Project
    </div>
    <div>
        Counter: {{ CounterStore.count }}
    </div>
    <button class="btn btn-primary" @click="to10">To 10</button>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
});

import { useCounterStore } from '../../stores/counterStore';
const CounterStore = useCounterStore();

const to10 = () => {
    CounterStore.to10();
}

</script>