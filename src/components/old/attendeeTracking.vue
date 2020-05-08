<template lang="pug">
    div.attendee-tracking
        div.attendee-tracking__heading
            h2.attendee-tracking__heading__header
                |AttendeeTracking:
        div.attendee-tracking__attendees-container
            attendee-button(
                v-for='(attendee, key) in attendees'
                v-bind:attendee='attendee'
                v-bind:key='key'
            )
</template>
<script>
import attendeeButton from './attendeeButton';

export default {
    name: 'attendeeTracking',
    components: {
        attendeeButton,
    },
    props: {
        attendees: {
            type: Array,
            default() {
                return ['attendee1', 'attendee2'];
            },
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../assets/colors.scss';

.attendee-tracking {
    &__heading {
        color: $grey;
    }
    &__attendees-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
}
</style>
