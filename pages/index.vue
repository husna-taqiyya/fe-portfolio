<template>
    <div data-theme="night" class="min-h-screen flex text-default">
        <!-- MAIN CONTENT -->
        <div class=" min-h-screen grow grid grid-cols-10">
            <!-- PROFILE CARD -->
            <div class="cols-span-10 md:col-span-3 ">
                <div class="fixed">content 1 FIXED ketika mediumx</div>
            </div>
            <!-- SECTIONS -->
            <div class="cols-span-10 md:col-span-7 ">
                <div class="min-h-screen">Section 1</div>
                <div class="min-h-screen">Section 2</div>
                <div class="min-h-screen">Section 3</div>
                <div class="min-h-screen">Section 4</div>
            </div>
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
    <div class="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <!-- drawer content pindahin ke main content -->
        <div class="drawer-side overflow-hidden">
            <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <!-- Sidebar content here -->
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>

</script>
