<template>
    <!-- TODO change bg color based on theme -->
    <div data-theme="nord" class="w-screen h-screen max-w-screen min-h-scren overflow-x-hidden">
        <!-- MOBILE HEADER -->
        <div class="lg:hidden h-[70px] relative border-b border-gray/20 px-3">
            <div class="h-full flex justify-between items-center">
                <a href="" class="flex-none flex gap-4 items-center">
                    <ImagesWings class="h-8" />
                </a>

                <label for="menu-toggle" class="btn btn-ghost">
                    <LucideAlignRight :size="24" />
                </label>
            </div>
        </div>

        <!-- MAIN HEADER -->
        <div class="h-[70px] relative border-b border-gray/20 px-3 lg:px-8 md:py-0 mb-12">
            <div class="h-full flex items-center lg:divide-x divide-gray/20">

                <!-- sisi kiri -->
                <a href="" class="max-lg:hidden flex-none flex gap-4 items-center pr-4">
                    <ImagesWings class="h-8" />
                    <div>HUSNA TAQIYYA</div>
                </a>

                <!-- sisi kanan -->
                <div class="grow flex justify-end items-center lg:pl-4">
                    <!-- breadcrumb -->
                    <!-- <div class="text-sm breadcrumbs">
                        <ul>
                            <li><a>Home</a></li>
                            <li><a>Documents</a></li>
                            <li>Add Document</li>
                        </ul>
                    </div> -->

                    <!-- avatar / account -->
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn w-10 h-10 min-h-10 btn-circle">
                            <div class="flex justify-center items-center">
                                <LucideUser :size="24" class="text-primary" />
                            </div>
                        </div>
                        <div class="dropdown-content z-[2] menu bg-base-100 shadow rounded w-52">
                            <div class="p-2 border-b">
                                <div class="font-semibold">Husna Taqiyya</div>
                                <div class="text-xs">Administrator</div>
                            </div>
                            <ul tabindex="0" class="p-2">
                                <li>
                                    <a>
                                        <LucideUser :size="16" /> User
                                    </a>
                                </li>
                                <li>
                                    <button @click="logout">
                                        <LucideLogOut :size="16" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- CONTENT -->
        <div class="w-full px-3 lg:px-8 pb-8">
            <div class="wrapper drawer lg:drawer-open rounded-2xl lg:rounded-3xl">
                <input id="menu-toggle" type="checkbox" class="drawer-toggle" />
                <!-- MAIN CONTENT -->
                <div class="z-0 lg:z-[1] drawer-content bg-neutral max-lg:rounded-2xl rounded-r-2xl lg:rounded-r-3xl">
                    <div class="w-full min-h-[75vh] lg:min-h-[83vh] bg-base-200 rounded-2xl lg:rounded-3xl p-3 lg:p-8">
                        <slot />
                    </div>
                </div>
                <div class="drawer-side h-full lg:!inline-table lg:bg-neutral rounded-l-0 lg:rounded-l-3xl overflow-hidden">
                    <label for="menu-toggle" aria-label="close sidebar" class="drawer-overlay"></label>
                    <div class="lg:w-full lg:z-[1]">
                        <!-- NAVIGATION -->
                        <AdminLayoutNavigation />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const config = useRuntimeConfig();
const apiUri = config.public.apiUri;

const logout = async () => {
    await $fetch(apiUri + '/logout', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    console.log(logout)
    console.log('logout')

    // redirect ke home halaman login
    navigateTo('/admin/login');
}
</script>

<style scoped>
.wrapper::before {
    content: "";
    width: 95%;
    -webkit-animation: 0.4s intro-wrapper-animation ease-in-out 0.33333s;
    animation: 0.4s intro-wrapper-animation ease-in-out 0.33333s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
    border-radius: 1.3rem;
    position: absolute;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -1rem;
    height: 100px;
    background-color: rgba(86, 86, 86, 0.1);
    z-index: 0;
}

.menu a,
.menu summary {
    position: relative;
    margin-bottom: 0.25rem;
    display: flex;
    height: 50px;
    align-items: center;
    border-radius: 0.5rem;
    padding-left: 1.25rem;
}

.menu a:focus {
    color: #fff;
}

.menu a.router-link-exact-active::before,
.menu details[open]>summary::before {
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

@keyframes intro-wrapper-animation {
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
</style>
