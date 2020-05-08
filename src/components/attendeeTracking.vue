<template lang="pug">
    div.attendee-tracking
        div
            div.title.font-weight-light.primary--text(v-if='editModeActive || !dataListEmpty')
                |AttendeeTracking:
        div.d-flex.flex-column(v-if='editModeActive')
            div.overline.mt-3
                |Add Attendees
            v-divider
            v-text-field.mt-2(
                color="accent"
                clearable
                filled
                shaped
                label=""
                hint="Comma seperated list"
                placeholder="name1,name2"
                v-model='tempAttendees'
            )
        div.d-flex.flex-column()
            div(v-if='!dataListEmpty && editModeActive')
                div.overline.mt-3
                    |Remove Attendees
                v-divider
            attendee-button(
                v-for='(attendee, key) in dataList'
                v-bind:attendee='attendee'
                v-bind:key='key'
                :editModeActive='editModeActive'
            )
</template>
<script>
import attendeeButton from './attendeeButton';
import customDivider from './customDivider';
import store from '../store'; // eslint-disable-line
import { mapGetters, mapMutations } from 'vuex'; // eslint-disable-line

export default {
    name: 'attendeeTracking',
    components: {
        attendeeButton,
        customDivider,
    },
    props: {
        editModeActive: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({}),
    computed: {
        ...mapGetters('attendees', ['getAttendees', 'getNewTempAttendees']),
        tempAttendees: {
            get() {
                return this.getNewTempAttendees;
            },
            set(value) {
                this.updateNewTempAttendees(value);
            },
        },
        dataList() {
            let dupedArray = this.getAttendees;
            return dupedArray.sort(function(a, b) {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                x = a.id;
                y = b.id;
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
        },
        dataListEmpty() {
            if (this.dataList.length === 0) {
                return true;
            }
            return false;
        },
    },
    methods: {
        ...mapMutations('attendees', ['updateNewTempAttendees']),
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
@import '../assets/colors.scss';
</style>
