import Vue from "vue";
import Vuex from "vuex";
import attendees from './modules/attendees';
import userText from './modules/userText';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    attendees,
    userText
  },
});

export default store;
