<template>
    <div>
        ini halaman Dashboard
    </div>
    <div>
        Counter: {{ CounterStore.count }}
    </div>
    <div class="flex gap-4">
        <button class="btn btn-primary" @click="CounterStore.increment">Add Counter</button>
        <button class="btn btn-primary" @click="CounterStore.decrement">Dec Counter</button>
    </div>

    <template v-if="AuthStore.user">
        <div>
            Nama: {{ AuthStore.user.name }}
        </div>
        <div>
            Email: {{ AuthStore.user.email }}
        </div>
    </template>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

import { useCounterStore } from '../../stores/counterStore';
const CounterStore = useCounterStore();
const AuthStore = useAuthStore();

</script>