<template>
    <div data-theme="nord" class="min-h-screen flex text-default">
        <!-- MAIN CONTENT -->
        <div class="min-h-screen grow">
            <slot />
        </div>

        <!-- SIDE MENU -->
        <DefaultlayoutSidemenu :menus="menus" />

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

