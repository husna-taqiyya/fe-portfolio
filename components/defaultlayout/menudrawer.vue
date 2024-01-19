<template>
    <div data-theme="forest" class="drawer drawer-end">
        <input v-model="show_drawer" type="checkbox" class="drawer-toggle" />
        <!-- drawer content pindahin ke main content -->
        <div class="drawer-side overflow-hidden">
            <label @click="show_drawer = !show_drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="p-4 w-80 min-h-full bg-base-200 text-base-content">
                <div class="px-4 text-2xl">Menu</div>
                <ul class="menu">
                    <!-- Sidebar content here -->
                    <li v-for="(menu, i) in menus" :key="i" class="my-2">
                        <NuxtLink :to="{ path: menu.path, hash: menu.hash }" @click="toogleDrawer = !toogleDrawer"
                            class="flex gap items-start">
                            <component :is="menu.icon" :size="16" class="text-secondary" />
                            <div>{{ menu.title }}</div>
                        </NuxtLink>
                    </li>
                </ul>
                <div class="px-4 py-4 text-2xl">Social</div>
                <div class="menu flex flex-row gap-6 pl-6">
                    <a href="https://www.instagram.com/" target="_blank">
                        <LucideInstagram :size="16" class="text-secondary" />
                    </a>
                    <a href="https://twitter.com/" target="_blank">
                        <LucideTwitter :size="16" class="text-secondary" />
                    </a>
                    <a href="https://google.com/" target="_blank">
                        <LucideGlobe2 :size="16" class="text-secondary" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    toogleDrawer: Boolean,
    menus: Array
});


let show_drawer = ref(props.toogleDrawer);
// show drawer = true
// use WATCH EFFECT -> akan check setiap perubahan variable
watchEffect(() => {
    // check perubahan dari props.toogleDrawer
    show_drawer.value = props.toogleDrawer;
});

</script>
