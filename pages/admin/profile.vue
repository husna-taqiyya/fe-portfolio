<template>
    <div>
        ini halaman Profile
    </div>
    <div>
        Counter: {{ CounterStore.count }}
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

import { useCounterStore } from '../../stores/counterStore';
const CounterStore = useCounterStore();


</script>