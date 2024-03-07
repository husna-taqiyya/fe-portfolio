<template>
    <input v-model="show_modal" type="checkbox" id="success" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <!-- x corner button -->
            <form method="dialog">
                <label class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</label>
            </form>

            <h3 class="font-bold text-lg">Select Skill</h3>

            <!-- loop category -->
            <div class="flex flex-col gap-5">
                <div v-for="cat in SkillStore.skillsByCategory" :key="cat.id">
                    <div>{{cat.title}}</div>
                    <!-- loop skill -->
                    <div class="flex flex-wrap gap-2">
                        <template v-for="skill in cat.Skill" :key="skill.id">
                            <button @click="$emit('addSkill', skill)" class="btn btn-sm" :class="{ 'btn-neutral' : selected.findIndex(s => s.id == skill.id) != -1 }">
                                <div v-html="skill.svg" class="w-6 h-6"></div>
                                {{ skill.title }}
                            </button>
                        </template>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <label @click="$emit('close')" class="btn">Close</label>
            </div>
        </div>
        <!-- click outside -->
        <form method="dialog" class="modal-backdrop">
            <label @click="$emit('close')">Close</label>
        </form>
    </div>
</template>

<script setup>
const props = defineProps({
    show: Boolean,
    selected: Array
});

defineEmits(['close', 'addSkill']);

const SkillStore = useSkillStore();
const show_modal = ref(false);

watchEffect(() => {
    show_modal.value = props.show;
});

</script>