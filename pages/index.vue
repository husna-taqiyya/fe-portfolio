<template>
    <div class="min-h-screen flex">
        <div class="bg-slate-600 min-h-screen grow grid grid-cols-10">
            <div class="cols-span-10 md:col-span-3 bg-orange-200">
                <div class="fixed">content 1 FIXED ketika medium</div>
            </div>
            <div class="cols-span-10 md:col-span-7 bg-orange-600">
                <div class="min-h-screen bg-lime-200">Section 1</div>
                <div class="min-h-screen bg-lime-400">Section 2</div>
                <div class="min-h-screen bg-lime-600">Section 3</div>
                <div class="min-h-screen bg-lime-800">Section 3</div>
            </div>
        </div>
        <div class="bg-slate-300 min-h-screen w-28 flex-none max-md:hidden">
            <div class="fixed">ini sidebar, muncul ketika medium</div>
        </div>
    </div>
</template>

<script setup>

</script>
