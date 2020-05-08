//import { missingIDError } from '../errorHandling/logging.js';
import { createId } from '../helpStuff/id.js';

const EStore = require('electron-store');
const eStore = new EStore();

function setAttendeeStorage() {
  eStore.set('attendees', state.attendees);
  //console.log(eStore.path); // eslint-disable-line
  localStorage.setItem('attendees', JSON.stringify(state.attendees));
}

const state = {
    // shape: [{String name, Boolean hasSpoken, int id}]
    //attendees: localStorage.getItem('attendees') ? JSON.parse(localStorage.getItem('attendees')) : [],
    attendees: eStore.get('attendees') ? eStore.get('attendees') : [],
    // shape: [String, String]
    newTempAttendees: [],
    // shape: [String, String]
    removeTempAttendees: [],
};

const mutations = {
    updateAllAttendees(state, payload) {
      state.attendees = payload;
    },
    resetAllAttendees(state, payload) {
      if (!payload) {
        console.error('No payload specified! e.g.(onRemoveList, hasSpoken)'); // eslint-disable-line
        return;
      }

      state.attendees.forEach(el => {
        if (payload === 'onRemoveList') {
          el.onRemoveList = false;
        }
        if (payload === 'hasSpoken') {
          el.hasSpoken = false;
        }
      });

      setAttendeeStorage();
    },
    updateAttendee(state, payload) {
      state.attendees.forEach(el => {
        if (el.id === payload.id) {
          state.attendees.splice(state.attendees.indexOf(el), 1);
          state.attendees.push(payload);
        }
      });

      setAttendeeStorage();
    },
    addAttendee(state, payload) {
      if (payload.trim() === '') return;
      let x = createId();
      let attendee = {
        name: payload.trim(),
        hasSpoken: false,
        id: x,
        onRemoveList: false,
      };
      state.attendees.push(attendee);

      setAttendeeStorage();
    },
    removeAttendee(state, payload) {
      state.attendees.forEach(el => {
        if (el.id === payload.id) {
          state.attendees.splice(state.attendees.indexOf(el), 1);
        }
      })

      setAttendeeStorage();
    },
    resetNewTempAttendees(state) {
      state.newTempAttendees = [];
    },
    updateNewTempAttendees(state, payload) {
      if (payload.trim() === '') {
        state.newTempAttendees = [];
        return;
      }
      let x = payload.split(",");
      let y = [];
      x.forEach(element => {
        y.push(element.trim());
      });
      state.newTempAttendees = y;
    },
    resetNewRemoveTempAttendees(state) {
      state.removeTempAttendees = [];
    },
    addRemoveTempAttendee(state, payload) {
      state.removeTempAttendees.push(payload);
    },
    removeRemoveTempAttendee(state, payload) {
      state.removeTempAttendees.splice(state.removeTempAttendees.indexOf(payload), 1);
    }
};

const actions = {};

const getters = {
    getAttendees: state => state.attendees,
    getNewTempAttendees: state => state.newTempAttendees,
    getRemoveTempAttendees: state => state.removeTempAttendees,
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}
