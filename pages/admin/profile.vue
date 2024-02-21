<template>
    <div>
        <div class="font-semibold mb-6 border-b-neutral/25">

            <div role="tablist" class="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Profile" checked />
                <div role="tabpanel" class="tab-content">
                    <AdminProfile v-if="ProfileStore.profile != null" />
                </div>

                <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Social Media" />
                <div role="tabpanel" class="tab-content">
                    <AdminProfileSocialMedia v-if="ProfileStore.profile != null" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
});

const ProfileStore = useProfileStore();
onBeforeMount(async () => {
    if (ProfileStore.profile == null) {
        // get profile if state profile is null
        await ProfileStore.get();
    }
});

</script>