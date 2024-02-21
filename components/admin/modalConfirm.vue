<template>
    <input v-model="show_modal" type="checkbox" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <form method="dialog">
                <label @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            </form>
            <!-- slot -->
            <slot />

            <div class="modal-action">
                <label @click="$emit('close')" class="btn">Close</label>
                <label class="btn text-white btn-success" @click="$emit('saved')">{{ text_save || 'Update' }}</label>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">Close</label>
        </form>
    </div>
</template>

<script setup>
const props = defineProps({
    show: Boolean,
    text_save: String
});

defineEmits(['close', 'saved']);

const show_modal = ref(false);

watchEffect(() => {
    show_modal.value = props.show;
});
</script>