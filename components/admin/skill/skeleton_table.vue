<template>
    <tbody>
        <!-- menampilkan skeleton -->
        <tr v-for="n in 10" :key="n">
            <th>
                <div class="skeleton w-12 h-12 rounded-xl"></div>
            </th>
            <td>
                <div class="flex gap-3 justify-center">
                    <div class="skeleton w-20 h-6"></div>
                </div>
            </td>
            <td>
                <div class="flex justify-center">
                    <!-- location -->
                    <div class="skeleton w-20 h-6 justify-items-center"></div>
                </div>
            </td>
            <td>
                <div class="flex justify-center">
                    <!-- date -->
                    <div class="skeleton w-20 h-6 max-auto"></div>
                </div>
            </td>
            <td>
                <div class="flex gap-3 justify-center">
                    <div class="skeleton rounded-full w-12 h-12"></div>
                    <div class="skeleton rounded-full w-12 h-12"></div>
                </div>
            </td>
        </tr>
    </tbody>
</template>