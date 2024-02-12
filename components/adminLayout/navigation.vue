<template>
    <ul class="menu bg-neutral lg:rounded-box p-4 w-[250px] min-h-screen lg:min-h-full text-white">
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
        icon: resolveComponent("LucideLayoutDashboard")
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