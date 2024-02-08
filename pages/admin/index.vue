<template>
    <div data-theme:="light" class="w-screen h-screen max-w-screen min-h-screen bg-gray-300">
        <!-- MOBILE HEADER -->
        <div class="lg:hidden h-[70px] relative border-b border-white/20 px-3">
            <div class="h-full flex justify-between items-center">
                <a href="" class="flex-none flex gap-4 items-center pr-4">
                    <ImagesWings class="h-8" />
                </a>

                <LucideAlignRight :size="24" />
            </div>
        </div>

        <!-- MAIN HEADER -->
        <div class="h-[70px] z-[51] relative border-b border-white/[0.08] px-3 sm:px-8 md:py-0 mb-12">
            <div class="h-full flex items-center divide-x divide-white/20">

                <!-- SISI KIRI -->
                <a class="flex flex-none gap-4 items-center pr-4">
                    <ImagesWings class="h-8" />
                    <div>HUSNA TAQIYYA</div>
                </a>

                <!-- SISI KANAN -->
                <div class="grow flex justify-between items-center pl-4 ">
                    <!-- breadcrumb-->
                    <div class="text-sm breadcrumbs">
                        <ul>
                            <li><a>Home</a></li>
                            <li><a>Documents</a></li>
                            <li>Add Document</li>
                        </ul>
                    </div>

                    <!-- avatar / account -->
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn w-10 h-10 min-h-10 btn-circle m-1">
                            <div class="h-full flex justify-center items-center">
                                <LucideUser :size="24" class="text-primary" />
                            </div>
                        </div>
                        <div class="dropdown-content z-[1] menu bg-base-100 shadow rounded w-52">
                            <div class="p-2 border-b">
                                <div class="font-semibold">Husna Taqiyya</div>
                                <div class="text-xs">Administrator</div>
                            </div>
                            <ul tabindex="0" class="p-2">
                                <li>
                                    <a>
                                        <LucideUser :size="16" />
                                        User
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <LucideLogOut :size="16" />
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: false
});
</script>
