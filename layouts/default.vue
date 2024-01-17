<template>
    <div data-theme="luxury" class="min-h-screen flex text-default">
        <!-- MAIN CONTENT -->
        <div class=" min-h-screen grow grid grid-cols-10">
            <slot />
        </div>
        <!-- SIDE MENU -->
        <div class=" min-h-screen w-28 flex-none max-md:hidden">
            <div class="fixed min-h-screen flex items-center">
                <div class="border border-neutral p-5 rounded-full flex flex-col gap-6">
                    <NuxtLink v-for="(menu, i) in menus" :key="i" :to="{ path: menu.path, hash: menu.hash }"
                        class="tooltip tooltip-left" :data-tip="menu.title">
                        <component :is="menu.icon" :size="16" class="text-secondary" />
                        <div>{{ menu.title }}</div>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- SIDE MENU TOOGLE BUTTON -->
        <div class="z-10 md:hidden drawer-content fixed right-8">
            <!-- Page content here -->
            <label for="my-drawer-4" class="btn btn-outline btn-circle mt-8">
                <LucideMenu :size="20" />
            </label>
        </div>
    </div>

    <!-- MOBILE MENU DRAWER -->
    <div class="drawer drawer-end text-deafult">
        <input v-model="toogleDrawer" id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <!-- drawer content pindahin ke main content -->
        <div class="drawer-side overflow-hidden">
            <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="p-4 w-80 min-h-full bg-base-200 text-base-content">
                <div class="px-4 text-2xl">Menu</div>
                <ul class="menu">
                    <!-- Sidebar content here -->
                    <li v-for="(menu, i) in menus" :key="i">
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
                    <a href="#">
                        <LucideTwitter :size="16" class="text-secondary" />
                    </a>
                    <a href="#">
                        <LucideGlobe2 :size="16" class="text-secondary" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// reactive boolean
const toogleDrawer = ref(false);

const menus = [
    {
        path: '/',
        hash: '#',
        title: 'Home',
        icon: resolveComponent('LucideHome')
    },
    {
        path: '/',
        hash: '#about',
        title: 'About',
        icon: resolveComponent('LucideGithub')
    },
    {
        path: '/',
        hash: '#resume',
        title: 'Resume',
        icon: resolveComponent('LucideLayoutPanelLeft')
    },
    {
        path: '/',
        hash: '#project',
        title: 'Project',
        icon: resolveComponent('LucideBriefcase')
    },
    {
        path: '/',
        hash: '#testimonial',
        title: 'Testimonial',
        icon: resolveComponent('LucideUserRound')
    },
    {
        path: '/',
        hash: '#contact',
        title: 'Contact',
        icon: resolveComponent('LucideMail')
    }
]


</script>

<style>
html,
body {
    scroll-behavior: smooth;
}
</style>

