<template lang="pug">
    div.daily-text
        h2.daily-text__header
            |{{currentData.header}}:
        div.daily-text__content
            |{{currentData.content}}
        div.daily-text__links
            ul.daily-text__links__list
                li.daily-text__links__list__entry(v-for='(link, index) in currentData.links' :key='"currentData" + index')
                    a.daily-text__links__list__entry__link(v-bind:href='link')
                        |{{link}}
        div.daily-text__edit(v-if='currentData.canEdit')
                button.daily-text__edit__button.daily-text__edit__button--edit(
                    v-on:click='editSaveLogic'
                    v-bind:class='{"daily-text__edit__button--save": readyToSave}'
                )
                    |{{buttonText}}
                button.daily-text__edit__button.daily-text__edit__button--cancel(v-on:click='cancelChange' v-show='readyToSave')
                    |Cancel
        div.daily-text__edit-container(v-show='readyToSave')
            textarea.daily-text__edit-container__content(v-model='newData.content')
            div.daily-text__edit-container__links
                input.daily-text__edit-container__links__link(
                    v-for='(newLink, index) in newData.links'
                    type='text'
                    :key='"newData" + index'
                    v-model='newData.links[index]'
                )
            div.daily-text__edit-container__edit-links
                button.daily-text__edit-container__edit-links__button.daily-text__edit-container__edit-links__button--add(v-on:click='addNewLink')
                    |Add
                button.daily-text__edit-container__edit-links__button.daily-text__edit-container__edit-links__button--remove(v-on:click='removeNewLink')
                    |Remove
</template>
<script>
export default {
    name: 'attendeeText',
    props: {
        data: {
            type: Object,
            default() {
                return {
                    header: 'HeaderText',
                    content: 'contentText',
                    links: ['https://issues.wdf.sap.corp/secure/Dashboard.jspa'],
                    canEdit: true,
                };
            },
        },
        id: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            readyToSave: false,
            localStorageItem: this.id + '_attendeeText_' + this.data.header.replace(/\s/g, '').toLowerCase(),
            currentData: {
                header: '',
                content: '',
                links: [],
            },
            newData: {
                header: '',
                content: '',
                links: [],
            },
        };
    },
    methods: {
        setCurrentData() {
            let x = JSON.parse(localStorage.getItem(this.localStorageItem));

            if (x) {
                this.currentData = x;
                return;
            } else {
                localStorage.setItem(this.localStorageItem, JSON.stringify(this.data));
                this.setCurrentData();
            }
        },
        setNewData() {
            if (this.currentData.canEdit) {
                this.newData.header = this.currentData.header;
                this.newData.content = this.currentData.content;
                this.newData.links = this.currentData.links;
                this.newData.canEdit = this.currentData.canEdit;
            }
        },
        editSaveLogic() {
            if (this.readyToSave) {
                localStorage.setItem(this.localStorageItem, JSON.stringify(this.newData));
                this.setCurrentData();
            }

            this.readyToSave = !this.readyToSave;
        },
        cancelChange() {
            if (this.readyToSave) {
                this.readyToSave = !this.readyToSave;
                this.setNewData();
            }
        },
        addNewLink() {
            this.newData.links.push('');
            this.setCurrentData(); // removing this causes current data to be also adjusted and I have no idea why
        },
        removeNewLink() {
            this.newData.links.pop();
            this.setCurrentData(); // removing this causes current data to be also adjusted and I have no idea why
        },
    },
    computed: {
        buttonText() {
            return this.readyToSave ? 'Save' : 'Edit';
        },
    },
    mounted() {
        this.setCurrentData();
        this.setNewData();
    },
};
</script>
<style lang="scss" scoped>
@import '../assets/colors.scss';
@import '../assets/buttons.scss';

.daily-text {
    &__header {
        color: $grey;
    }

    &__content {
        white-space: pre;
    }

    &__links {
        &__list {
            &__entry {
                list-style-type: armenian;
                color: rgba($blue, 1);
                transition: all 0.2s ease-in-out;

                &:hover {
                    color: rgba($blue, 0.8);
                }

                &__link {
                    display: flex;
                    padding: 0.2rem 0;
                    font-size: 1.1rem;
                    text-decoration: none;
                    color: rgba($purple, 1);
                    border-right: 5px double transparent;
                    transition: all 0.2s ease-in-out;

                    &:hover {
                        cursor: pointer;
                        color: rgba($purple, 0.8);
                        border-right: 5px double $purple;
                    }
                }
            }
        }
    }

    &__edit {
        margin-bottom: 0.2rem;

        &__button {
            @include button;

            &--edit {
                background: rgba($blue, 0.2);
                border: 1px solid $blue;
            }
            &--save {
                background: rgba($green, 0.2);
                border: 1px solid $green;
            }
            &--cancel {
                background: rgba($red, 0.2);
                border: 1px solid $red;
            }
        }
    }

    &__edit-container {
        display: flex;
        flex-direction: column;

        &__content {
            margin-bottom: 0.2rem;
            transition: all 0.2s ease-in-out;
            border: 1px solid $blue;
            border-radius: 3px;

            &:focus {
                outline: none;
                border: 1px solid $purple;
                border-right: 5px solid $purple;
            }

            &:hover {
                transform: scale(1.05);
            }
        }

        &__links {
            display: flex;
            flex-direction: column;
            &__link {
                margin-bottom: 0.2rem;
                border: 1px solid $blue;
                border-radius: 3px;
                padding: 0.2rem;
                transition: all 0.2s ease-in-out;

                &:focus {
                    outline: none;
                    border: 1px solid $purple;
                    border-right: 5px solid $purple;
                }

                &:hover {
                    transform: scale(1.05);
                }
            }
        }

        &__edit-links {
            display: flex;
            flex-direction: row;

            &__button {
                @include button;

                &--add {
                    background: rgba($blue, 0.2);
                    border: 1px solid $blue;
                }

                &--remove {
                    background: rgba($red, 0.2);
                    border: 1px solid $red;
                }
            }
        }
    }
}
</style>
