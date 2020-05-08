<template lang="pug">
    v-divider.divider.accent
</template>
<script>
export default {
    name: 'customDivider',
    props: {
        horizontal: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: 'accent',
        },
    },
};
</script>
<style lang="scss" scoped>
.divider {
    opacity: 0.3;
}
</style>
