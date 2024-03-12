<template>
    <div>
        <div class="flex max-sm:flex-col max-sm:items-center sm:justify-between gap-2">

            <!-- search input -->
            <div class="skeleton w-full sm:max-w-xs h-7 md:h-8 rounded-lg"></div>

            <!-- pagination -->
            <div class="join pt-10 skeleton w-full h-8">
                <button class="join-item skeleton h-6 w-4 rounded-lg"></button>
                <button class="join-item skeleton h-6 w-28"></button>
                <button class="join-item skeleton h-6 w-4 rounded-lg"></button>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pt-5">
            <div v-for="n in 12" :key="n" class="card card-compact bg-base-100 shadow-xl overflow-hidden relative">
                <figure class="relative">
                    <div class="skeleton rounded-none aspect-video w-full">
                    </div>
                </figure>
                <div class="card-body">
                    <div class="skeleton w-32 h-4 "></div>
                    <div class="skeleton w-full h-3 "></div>
                </div>
            </div>
        </div>

        <div class="flex justify-end mt-2">
            <!-- pagination -->
            <div class="join">
                <button class="join-item skeleton h-6 w-4 rounded-lg"></button>
                <button class="join-item skeleton h-6 w-28"></button>
                <button class="join-item skeleton h-6 w-4 rounded-lg"></button>
            </div>
        </div>
    </div>
</template>