<template lang="pug">
    div
        v-btn.mt-1.mb-1(
            block
            v-if='!editModeActive'
            :class='uniqueAttendee.hasSpoken ? "text--lighten-3" : ""'
            :color='uniqueAttendee.hasSpoken ? "secondary" : "primary"'
            :outlined='uniqueAttendee.hasSpoken ? true : false'
            @click='ToggleHasSpoken'
        )
            |{{uniqueAttendee.name}}
        div(v-else)
            v-btn.mt-1.mb-1(
                    text
                    :class='uniqueAttendee.onRemoveList ? "" : "text--lighten-3"'
                    :color='uniqueAttendee.onRemoveList ? "error" : "secondary"'
                    @click='addOrRemoveFromRemoveList'
                )
                    v-icon(
                        left
                        color="error"
                    )
                        |mdi-account-minus-outline
                    |{{uniqueAttendee.name}}
</template>
<script>
import store from '../store'; // eslint-disable-line
import { mapGetters, mapMutations } from 'vuex'; // eslint-disable-line

export default {
    name: 'attendeeButton',
    props: {
        attendee: {
            type: Object,
            default() {
                return {
                    name: 'exampleName',
                    hasSpoken: false,
                    id: 1337,
                    onRemoveList: false,
                };
            },
        },
        editModeActive: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    methods: {
        ...mapMutations('attendees', ['updateAttendee', 'addRemoveTempAttendee', 'removeRemoveTempAttendee']),
        ToggleHasSpoken() {
            let x = !this.uniqueAttendee.hasSpoken;

            this.updateAttendee({
                name: this.uniqueAttendee.name,
                hasSpoken: x,
                id: this.uniqueAttendee.id,
                onRemoveList: this.uniqueAttendee.onRemoveList,
            });
        },
        addOrRemoveFromRemoveList() {
            let y = !this.uniqueAttendee.onRemoveList;
            let x = {
                name: this.uniqueAttendee.name,
                hasSpoken: this.uniqueAttendee.hasSpoken,
                id: this.uniqueAttendee.id,
                onRemoveList: y,
            };

            if (this.uniqueAttendee.onRemoveList) {
                this.removeRemoveTempAttendee(this.uniqueAttendee);
            } else {
                this.addRemoveTempAttendee(this.uniqueAttendee);
            }

            this.updateAttendee(x);
        },
    },
    computed: {
        ...mapGetters('attendees', ['getAttendees']),
        uniqueAttendee() {
            let x = {
                name: 'error',
                hasSpoken: true,
                id: -1,
                onRemoveList: false,
            };
            this.getAttendees.forEach((element) => {
                if (element.id === this.attendee.id) {
                    x = element;
                }
            });
            return x;
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
