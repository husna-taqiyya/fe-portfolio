<template>
    <div class=" min-h-screen w-28 flex-none max-md:hidden relative">
        <div class="fixed min-h-screen flex items-center">
            <div class="border border-neutral p-5 rounded-full flex flex-col gap-6">
                <NuxtLink v-for="(menu, i) in menus" :key="i" :to="{ path: menu.path, hash: menu.hash }"
                    class="tooltip tooltip-left" :data-tip="menu.title">
                    <component :is="menu.icon" :size="16" class="text-secondary" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    menus: Array
})

</script>

