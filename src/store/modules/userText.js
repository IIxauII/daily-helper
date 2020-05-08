import { missingIDError } from '../errorHandling/logging.js';
import { setTextStorage,
  setLinksStorage,
  setTempTextStorage,
  setTempLinksStorage } from '../helpStuff/localStorage.js';

const EStore = require('electron-store');
const eStore = new EStore();

function forceUpdateArray(data) {
  data.push("FORCE UPDATE");
  data.pop();
}

const state = {
  // array containing two String entries
  // shape: [String, String]
  //text: localStorage.getItem('attendeeText') ? JSON.parse(localStorage.getItem('attendeeText')) : ['', ''],
  text: eStore.get('attendeeText') ? eStore.get('attendeeText') : ['', ''],
  // array containing two Array entires with String entries
  // shape: [[String, String], [String, String]]
  //links: localStorage.getItem('attendeeLinks') ? JSON.parse(localStorage.getItem('attendeeLinks')) : [[], []],
  links: eStore.get('attendeeLinks') ? eStore.get('attendeeLinks') : [[], []],
  // temp stuff
  //tempText: localStorage.getItem('attendeeTempText') ? JSON.parse(localStorage.getItem('attendeeTempText')) : ['', ''],
  tempText: eStore.get('attendeeTempText') ? eStore.get('attendeeTempText') : ['', ''],
  //tempLinks: localStorage.getItem('attendeeTempLinks') ? JSON.parse(localStorage.getItem('attendeeTempLinks')) : [[],[]],
  tempLinks: eStore.get('attendeeTempLinks') ? eStore.get('attendeeTemplinks') : [[], []],
};

const mutations = {
  updateText(state, payload) {
    if (isNaN(payload.id)) { missingIDError(); return; }
    state.text[payload.id] = payload.data;
    forceUpdateArray(state.text);
    setTextStorage(state.text);
  },
  updateLink(state, payload) {
    if (isNaN(payload.id)) { missingIDError(); return; }
    state.links[payload.id] = payload.data;
    forceUpdateArray(state.links);
    setLinksStorage(state.links);
  },
  updateTempText(state, payload) {
    if (isNaN(payload.id)) { missingIDError(); return; }
    state.tempText[payload.id] = payload.data;
    setTempTextStorage(state.tempText);
  },
  updateTempLink(state, payload) {
    if (isNaN(payload.id)) { missingIDError(); return; }
    if (payload.data.trim() === '') {
      state.tempLinks[payload.id] = [];
      setTempLinksStorage(state.tempLinks);
      return;
    }
    let x = payload.data.split(',');
    let y = [];
    x.forEach(element => {
      y.push(element.trim());
    });
    state.tempLinks[payload.id] = y;
    setTempLinksStorage(state.tempLinks);
  },
  resetAllText(state) {
    state.text = [];
    setTextStorage(state.text);
  },
  resetAllLinks(state) {
    state.links = [];
    setLinksStorage(state.links);
  },
  resetTempText(state) {
    state.tempText = [];
    setTempTextStorage(state.tempText);
  },
  resetTempLinks(state) {
    state.tempLinks = [];
    setTempLinksStorage(state.tempLinks);
  },
};

const actions = {};

const getters = {
  getText: state => state.text,
  getLinks: state => state.links,
  getTempText: state => state.tempText,
  getTempLinks: state => state.tempLinks,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
