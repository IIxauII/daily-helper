<template lang="pug">
    div.daily-text.mb-10.d-flex.flex-column
        div.title.font-weight-light.primary--text(v-if='editModeActive || !dayTextIsEmpty')
            |{{headerText}}
        //
            span.overline
                |{{subHeaderText}}
        v-divider(v-if='editModeActive || !dayTextIsEmpty')
        div.body-2.text-pre(v-if='!editModeActive')
            |{{dayText}}
        v-textarea.mt-2(
            v-if='editModeActive'
            color="accent"
            clearable
            filled
            shaped
            auto-grow
            no-resize
            :label='editTextLabel'
            :hint='editTextHint'
            v-model='tempText'
        )
        //
            div.overline.mt-3(v-if='dayLinks || editModeActive')
                |{{editModeActive ? 'Add Links' : 'Links'}}
            v-divider
            div(v-if='editModeActive')
                v-text-field(
                    :label='linksLabel'
                    :hint='linksHint'
                    v-model='tempLinks'
                )
            div.d-flex.flex-column(v-if='!editModeActive')
                v-btn.mt-1(
                    v-for='(link, key) in dayLinks'
                    :key='key'
                    :href='link'
                    target='_blank'
                    link
                    x-small
                    :color='"accent"'
                )
                    |{{link}}
</template>
<script>
import store from '../store'; // eslint-disable-line
import { mapGetters, mapMutations } from 'vuex'; // eslint-disable-line

export default {
    name: 'attendeeText',
    props: {
        id: {
            type: Number,
            default: -1,
        },
        editModeActive: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            headerText: this.id === 0 ? 'Yesterday' : 'Today',
            subHeaderText: this.id === 0 ? 'What I have done' : 'What I will do',
            editTextLabel: this.id === 0 ? 'How was work?' : 'Any plans today?',
            editTextHint: this.id === 0 ? '' : '',
            linksLabel: 'Links',
            linksHint: 'Comma seperated list',
        };
    },
    methods: {
        ...mapMutations('userText', ['updateTempText', 'updateTempLink']),
    },
    computed: {
        ...mapGetters('userText', ['getText', 'getLinks', 'getTempText', 'getTempLinks']),
        dayText() {
            return this.getText[this.id];
        },
        dayLinks() {
            return this.getLinks[this.id];
        },
        dayTempText() {
            return this.getTempText[this.id];
        },
        dayTempLinks() {
            return this.getTempLinks[this.id];
        },
        tempText: {
            get() {
                return this.dayText;
            },
            set(value) {
                if (!value) {
                    this.updateTempText({ id: this.id, data: '' });
                } else {
                    this.updateTempText({ id: this.id, data: value });
                }
            },
        },
        tempLinks: {
            get() {
                return this.dayTempLinks;
            },
            set(value) {
                this.updateTempLink({ id: this.id, data: value });
            },
        },
        dayTextIsEmpty() {
            if (this.dayText && this.dayText.length && this.dayText !== '' && this.dayText !== ' ') {
                return false;
            }
            return true;
        },
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
.text-pre {
    white-space: normal;
}
</style>
