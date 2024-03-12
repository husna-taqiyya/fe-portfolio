<template>
    <tbody>
        <!-- menampilkan skeleton -->
        <tr v-for="n in 10" :key="n">
            <th>
                <!-- institution -->
                <div class="skeleton w-40 h-6"></div>
            </th>
            <td>
                <!-- periode -->
                <div class="flex gap-3 justify-center">
                    <div class="skeleton w-20 h-6"></div>
                    <div class="skeleton w-20 h-6"></div>
                </div>
            </td>
            <td>
                <div class="flex justify-center">
                    <!-- major -->
                    <div class="skeleton w-20 h-6 justify-items-center"></div>
                </div>
            </td>
            <td>
                <div class="flex justify-center">
                    <!-- degree -->
                    <div class="skeleton w-20 h-6 max-auto"></div>
                </div>
            </td>
            <td>
                <!-- action -->
                <div class="flex gap-3 justify-center">
                    <div class="skeleton rounded-xl w-12 h-12"></div>
                    <div class="skeleton rounded-xl w-12 h-12"></div>
                </div>
            </td>
        </tr>
    </tbody>
</template>