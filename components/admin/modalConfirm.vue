<template>
    <!-- MODAL CONFIRMATION -->
    <!-- Put this part before </body> tag -->
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x corner button -->
            <form method="dialog">
                <label @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            </form>
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Are you sure?</p>
            <div class="modal-action">
                <label @click="$emit('close')" class="btn">Close</label>
                <label @click="" class="btn btn-neutral">Update</label>
            </div>
        </div>
        <!-- click outside -->
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">Close</label>
        </form>
    </div>
</template>

<script setup>
defineEmits(['close']);
const props = defineProps({
    show: Boolean
});

const show_modal = ref(false);

watchEffect(() => {
    show_modal.value = props.show;
});
</script>