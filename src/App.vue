<template lang="pug">
    v-app#app( :dark='setTheme' )
        v-app-bar.mb-5.app-bar(height="56px" max-height="56px")
                div
                    v-btn.accent.mr-1(
                        @click='initNewSession'
                        :disabled='sessionHasNotStarted'
                    )
                        |New Session
                    v-btn.primary.mr-1(
                        :class='{"success" : editModeActive}'
                        @click='editOrSave'
                    )
                        |{{editSaveText}}
                    //
                        v-icon.pulsingIcon(
                            v-if='(attendeeListEmpty && dayTextEmpty && !editModeActive) || (attendeeListEmpty && !editModeActive) || (dayTextEmpty && !editModeActive)'
                            color='accent'
                            large
                        )
                            |mdi-subdirectory-arrow-left
                    v-btn.error(
                        v-show='editModeActive'
                        @click='cancelEdit'
                    )
                        |Cancel
                div(
                    style='display:flex;flex-direction:column;justify-content:center;height:100%;'
                )
                    v-switch(
                        style='height:calc(50% - 2px);'
                        v-model='goDark'
                        color='primary'
                        inset
                        dense
                        :prepend-icon='goDark ? "mdi-weather-night" : "mdi-weather-sunny"'
                    )
                    //
                        :label='goDark ? "🌘" : "🌕"'
        v-alert.ml-2.mr-2(
            v-if='attendeeListEmpty && dayTextEmpty && !editModeActive'
            type='info'
            color='accent'
            prominent
            border='right'
            dismissible
            elevation=12
        )
            |Click Edit to get started
        div.d-flex.justify-space-around(style='height:100%; z-index:1;')
            div(
                style="flex-basis:30%; flex-grow: 0; flex-shrink: 0;"
            )
                v-alert.ml-1.mr-1(
                    v-if='(attendeeListEmpty && !editModeActive) && !(attendeeListEmpty && dayTextEmpty && !editModeActive)'
                    type='info'
                    color='accent'
                    prominent
                    border='right'
                    dismissible
                    elevation=12
                )
                    |Click Edit to add attendees
                attendee-tracking(:editModeActive='editModeActive')
            v-divider(
                vertical
            )
            div.d-flex.flex-column(
                style='flex-basis:50%;max-width: 50%;'
            )
                v-alert.ml-1.mr-1(
                    v-if='(dayTextEmpty && !editModeActive) && !(attendeeListEmpty && dayTextEmpty && !editModeActive)'
                    type='info'
                    color='accent'
                    prominent
                    border='right'
                    dismissible
                    elevation=12
                )
                    |Click Edit to add your daily report
                attendee-text(
                    v-for='x in 2'
                    :editModeActive='editModeActive'
                    :id='x - 1'
                )
        div.watermark.watermark--light(
            :class='{"watermark--dark": setTheme}'
        )
</template>
<script>
import attendeeTracking from './components/attendeeTracking';
import attendeeText from './components/attendeeText';

import store from './store'; // eslint-disable-line
import { mapGetters, mapMutations } from 'vuex'; // eslint-disable-line

export default {
    name: 'App',

    components: {
        attendeeTracking,
        attendeeText,
    },

    data: () => ({
        editModeActive: false,
        goDark: localStorage.getItem('darkMode') ? JSON.parse(localStorage.getItem('darkMode')) : false,
    }),

    methods: {
        ...mapMutations('attendees', ['addAttendee', 'removeAttendee', 'resetAllAttendees', 'resetNewTempAttendees', 'resetNewRemoveTempAttendees']),
        ...mapMutations('userText', ['updateText', 'updateLink', 'resetAllText', 'resetAllLinks', 'resetTempText', 'resetTempLinks']),
        toggleEditMode() {
            this.editModeActive = !this.editModeActive;
        },
        cancelEdit() {
            // reset attendee stuff
            this.resetNewTempAttendees();
            this.resetNewRemoveTempAttendees();
            this.resetAllAttendees('onRemoveList');
            // reset text stuff
            this.resetTempText();
            this.resetTempLinks();
            // switch edit mode
            this.toggleEditMode();
        },
        initNewSession() {
            // attendee stuff
            this.resetNewTempAttendees();
            this.resetNewRemoveTempAttendees();
            this.resetAllAttendees('onRemoveList');
            this.resetAllAttendees('hasSpoken');
            // usertext stuff
            this.resetAllText();
            //this.resetAllLinks();
            this.resetTempText();
            //this.resetTempLinks();
        },
        editOrSave() {
            if (!this.editModeActive) {
                this.toggleEditMode();
                return;
            }

            // attendee stuff
            if (this.getNewTempAttendees.length) {
                this.getNewTempAttendees.forEach((element) => {
                    this.addAttendee(element);
                });
            }

            if (this.getRemoveTempAttendees.length) {
                this.getRemoveTempAttendees.forEach((element) => {
                    this.removeAttendee(element);
                });
            }

            // reset tmp lists for next edit
            this.resetNewTempAttendees();
            this.resetNewRemoveTempAttendees();
            // save data in localstorage
            localStorage.setItem('attendees', JSON.stringify(this.getAttendees));

            // usertext stuff
            // yesterday & today
            let x = 0;
            while (x <= 1) {
                if (this.getTempText[x] || this.getTempText[x] === '') {
                    this.updateText({ id: x, data: this.getTempText[x] });
                }
                /* if (this.getTempLinks[x] && this.getTempLinks[x].length) {
                    this.updateLink({ id: x, data: this.getTempLinks[x] });
                } */
                ++x;
            }

            // reset tmp lists for next eit
            this.resetTempText();
            this.resetTempLinks();

            this.toggleEditMode();
        },
    },
    computed: {
        ...mapGetters('attendees', ['getAttendees', 'getNewTempAttendees', 'getRemoveTempAttendees']),
        ...mapGetters('userText', ['getText', 'getTempLinks', 'getTempText']),
        editSaveText() {
            return this.editModeActive ? 'Save' : 'Edit';
        },
        setTheme() {
            if (this.goDark) {
                localStorage.setItem('darkMode', JSON.stringify(true));
                return (this.$vuetify.theme.dark = true); // eslint-disable-line
            } else {
                localStorage.setItem('darkMode', JSON.stringify(false));
                return (this.$vuetify.theme.dark = false); // eslint-disable-line
            }
        },
        attendeeListEmpty() {
            if (this.getAttendees.length === 0) {
                return true;
            }
            return false;
        },
        dayTextEmpty() {
            if (this.getText) {
                if (!this.getText[0] && !this.getText[1]) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        },
        sessionHasNotStarted() {
            if (this.attendeeListEmpty && this.dayTextEmpty) {
                return true;
            }

            if (!this.dayTextEmpty) {
                return false;
            }

            if (!this.attendeeListEmpty) {
                let someoneHasSpoken = false;
                this.getAttendees.forEach((attendee) => {
                    if (attendee.hasSpoken) {
                        someoneHasSpoken = true;
                    }
                });

                if (someoneHasSpoken) {
                    return false;
                }
                return true;
            }

            return false;
        },
    },
};
</script>
<style lang="scss">
#app {
    overflow: hidden;
}

.app-bar > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.watermark {
    background-image: url(/img/icon-secondary.ce96f59b.png);
    width: 30rem;
    height: 30rem;
    position: absolute;
    right: -9%;
    bottom: -5%;
    background-size: 130%;
    transform: rotate(20deg);

    &.watermark--light {
        //background-image: url('./assets/images/icon-accent.png');
        background-image: url('./assets/images/icon-light.png');
        opacity: 0.5;
    }

    &.watermark--dark {
        //background-image: url('./assets/images/icon-secondary.png');
        //opacity: 0.05;
        background-image: url('./assets/images/icon-dark.png');
        opacity: 0.5;
    }
}

.pulsingIcon {
    animation-name: pulse, fadeOut;
    animation-duration: 0.5s, 2s;
    animation-iteration-count: 6, 1;
    animation-delay: 0s, 3s;
    animation-fill-mode: none, forwards;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>
