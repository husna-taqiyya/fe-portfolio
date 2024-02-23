<template>
    <ul class="navigation menu bg-neutral lg:rounded-box p-4 w-[250px] min-h-screen lg:min-h-full text-white">
        <li class="my-2 font-light">MAIN MENU</li>
        <template v-for="(menu, i) in menus" :key="i">
            <AdminLayoutNavigationItem :menu="menu" />
        </template>
    </ul>
</template>

<script setup>

const menus = [
    {
        title: "Dashboard",
        to: "/admin",
        icon: resolveComponent("LucideLayoutDashboard")
    },
    {
        title: "Profile",
        to: "/admin/profile",
        icon: resolveComponent("LucideUserRound")
    },
    {
        title: "Education",
        to: "/admin/education",
        icon: resolveComponent("LucideGraduationCap")
    },
    {
        title: "Project",
        to: "/admin/project",
        icon: resolveComponent("LucideLayoutDashboard")
    },
    // {
    //     title: "Menu 3",
    //     icon: resolveComponent("LucideLayoutDashboard"),
    //     children: [
    //         {
    //             title: "Children 1",
    //             to: "/admin",
    //             icon: resolveComponent("LucideLayoutDashboard"),
    //             children: [
    //                 {
    //                     title: "Sub Children 1",
    //                     to: "/admin",
    //                     icon: resolveComponent("LucideLayoutDashboard")
    //                 },
    //                 {
    //                     title: "Sub Children 2",
    //                     to: "/admin",
    //                     icon: resolveComponent("LucideLayoutDashboard")
    //                 },
    //             ]
    //         },
    //     ]
    // },
]

</script>

<style setup>
.navigation.menu a,
.navigation.menu summary {
    position: relative;
    margin-bottom: 0.25rem;
    display: flex;
    height: 50px;
    align-items: center;
    border-radius: 0.5rem;
    padding-left: 1.25rem;
}

.navigation.menu a:focus {
    color: #fff;
}

.navigation.menu a.router-link-exact-active::before,
.navigation.menu details[open]>summary::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: block;
    border-radius: 0.5rem;
    border-bottom-width: 3px;
    border-style: solid;
    border-color: rgb(0 0 0 / 0.1);
    background-color: rgb(255 255 255 / 0.08);
}

@media (min-width: 1024px) {
    .menu a.router-link-exact-active::after {
        content: "";
        width: 20px;
        height: 80px;
        margin-right: -47px;
        -webkit-animation: 0.3s active-side-menu-chevron-animation ease-in-out 0.33333s;
        animation: 0.3s active-side-menu-chevron-animation ease-in-out 0.33333s;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='80' viewBox='0 0 20 122.1'%3E%3Cpath data-name='Union 1' d='M16.038 122H16v-2.213a95.805 95.805 0 00-2.886-20.735 94.894 94.894 0 00-7.783-20.434A39.039 39.039 0 010 61.051a39.035 39.035 0 015.331-17.567 94.9 94.9 0 007.783-20.435A95.746 95.746 0 0016 2.314V0h4v122h-3.961v.1l-.001-.1z' fill='%23e8e8e8'/%3E%3C/svg%3E");
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
        margin-top: auto;
        margin-bottom: auto;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0;
    }
}

@keyframes active-side-menu-chevron-animation {
    100% {
        margin-right: -22px;
        opacity: 1;
    }
}
</style>