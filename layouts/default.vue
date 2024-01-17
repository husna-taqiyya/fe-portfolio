<template>
    <div data-theme="night" class="min-h-screen flex text-default">
        <!-- MAIN CONTENT -->
        <div class=" min-h-screen grow grid grid-cols-10">
            <slot />
        </div>
        <!-- SIDE MENU -->
        <div class=" min-h-screen w-28 flex-none max-md:hidden">
            <div class="fixed min-h-screen flex items-center">
                <div class="border border-neutral p-5 rounded-full flex flex-col gap-6">
                    <div class="tooltip tooltip-left" data-tip="Home">
                        <LucideHome :size="16" class="text-accent" />
                    </div>
                    <div class="tooltip tooltip-left" data-tip="About">
                        <LucideGithub :size="16" class="text-accent" />
                    </div>
                    <div class="tooltip tooltip-left" data-tip="Resume">
                        <LucideLayoutPanelLeft :size="16" class="text-accent" />
                    </div>
                    <div class="tooltip tooltip-left" data-tip="Project">
                        <LucideBriefcase :size="16" class="text-accent" />
                    </div>
                    <div class="tooltip tooltip-left" data-tip="Testimonial">
                        <LucideUserRound :size="16" class="text-accent" />
                    </div>
                    <div class="tooltip tooltip-left" data-tip="Contact">
                        <LucideMail :size="16" class="text-accent" />
                    </div>
                </div>
            </div>
        </div>

        <!-- SIDE MENU TOOGLE BUTTON -->
        <div class="drawer-content fixed right-16">
            <!-- Page content here -->
            <label for="my-drawer-4" class="btn btn-outline btn-circle mt-8">
                <LucideMenu />
            </label>
        </div>
    </div>

    <!-- MOBILE MENU DRAWER -->
    <div class="drawer drawer-end text-deafult">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <!-- drawer content pindahin ke main content -->
        <div class="drawer-side overflow-hidden">
            <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="p-4 w-80 min-h-full bg-base-200 text-base-content">
                <div class="px-4 text-2xl">Menu</div>
                <ul class="menu">
                    <!-- Sidebar content here -->
                    <li>
                        <a href="#" class="flex gap items-start">
                            <LucideHome :size="16" class="text-secondary" />
                            <div>Home</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex gap items-start">
                            <LucideGithub :size="16" class="text-secondary" />
                            <div>About</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex gap items-start">
                            <LucideLayoutPanelLeft :size="16" class="text-secondary" />
                            <div>Resume</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex gap items-start">
                            <LucideBriefcase :size="16" class="text-secondary" />
                            <div>Project</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex gap items-start">
                            <LucideUserRound :size="16" class="text-secondary" />
                            <div>Testimonial</div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex gap items-start">
                            <LucideMail :size="16" class="text-secondary" />
                            <div>Contact</div>
                        </a>
                    </li>
                </ul>
                <div class="px-4 py-4 text-2xl">Social</div>
                <div class="menu flex flex-row gap-6 pl-6">
                    <a href="#">
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

