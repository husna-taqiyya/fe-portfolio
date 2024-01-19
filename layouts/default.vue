<template>
    <div data-theme="night" class="min-h-screen flex text-default">
        <!-- MAIN CONTENT -->
        <div class="min-h-screen grow">
            <slot />
        </div>

        <!-- SIDE MENU -->
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

        <!-- SIDE MENU TOOGLE BUTTON -->
        <div class="z-10 md:hidden drawer-content fixed right-8">
            <!-- Page content here -->
            <label @click="toogleDrawer = !toogleDrawer" class="btn btn-outline btn-neutral btn-circle mt-8">
                <LucideMenu :size="22" class="text-accent" />
            </label>
        </div>
    </div>

    <!-- MOBILE MENU DRAWER -->
    <DefaultlayoutMenudrawer :toogleDrawer="toogleDrawer" :menus="menus" />
</template>

<script setup>
// reactive boolean
// Toogle for open/close drawer
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
        icon: resolveComponent('LucideUserRound')
    },
    {
        path: '/',
        hash: '#blog',
        title: 'Blog',
        icon: resolveComponent('LucideNewspaper')
    },
    {
        path: '/',
        hash: '#experience',
        title: 'Experience',
        icon: resolveComponent('LucideGraduationCap')
    },
    {
        path: '/',
        hash: '#education',
        title: 'Education',
        icon: resolveComponent('LucideBrifecase')
    },
    {
        path: '/',
        hash: '#project',
        title: 'Project',
        icon: resolveComponent('LucideLayoutPanelLeft')
    },
    {
        path: '/',
        hash: '#skill',
        title: 'Skill',
        icon: resolveComponent('LucideWrench')
    }
]


</script>

<style>
html,
body {
    scroll-behavior: smooth;
}
</style>

