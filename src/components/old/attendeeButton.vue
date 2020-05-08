<template lang="pug">
    button.attendee-button(
        v-bind:class='{ "attendee-button--has-spoken": hasSpoken }'
        v-on:click='ToggleHasSpoken'
    )
        |{{attendee}}
</template>
<script>
export default {
    name: 'attendeeButton',
    props: {
        attendee: {
            type: String,
            default: 'attendant',
        },
    },
    data() {
        return {
            hasSpoken: false,
        };
    },
    beforeMount() {
        this.checkIfLocal();
    },
    methods: {
        checkIfLocal() {
            let x = localStorage.getItem(this.attendee);

            if (x) {
                this.hasSpoken = this.makeBool(x);
            } else {
                // localStorage cleared -> set new localStorage
                localStorage.setItem(this.attendee, this.hasSpoken);
            }
        },
        ToggleHasSpoken() {
            localStorage.setItem(this.attendee, !this.hasSpoken);
            this.hasSpoken = !this.hasSpoken;
        },
        makeBool(string) {
            if (string === 'true') {
                return true;
            }
            return false;
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../assets/colors.scss';

.attendee-button {
    width: 100%;
    transition: all 0.2s ease-in-out;
    margin: 0.2rem 0;
    padding: 0.3rem 0.5rem;
    border: 1px solid $blue;
    background: transparent;
    color: $grey;
    border-radius: 3px;
    outline: none;
    font-size: 1.1rem;

    &--has-spoken {
        opacity: 0.5;
        border-color: $red;
        width: 20%;
        border-right: none;
        border-top: none;
        border-bottom: none;
        border-radius: 0;
        border-left-width: 0.25rem;
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
}
</style>
