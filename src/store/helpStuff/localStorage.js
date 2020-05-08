const EStore = require('electron-store');
const eStore = new EStore();

//////////////////////
// text & link storage
//////////////////////
// function set user text in localstorage
function setTextStorage(data) {
  eStore.set('attendeeText', data);
  localStorage.setItem('attendeeText', JSON.stringify(data));
}
// set links from user in localstorage
function setLinksStorage(data) {
  eStore.set('attendeeLinks', data);
  localStorage.setItem('attendeeLinks', JSON.stringify(data));
}

////////////////////
// temp text & links
////////////////////
// temp text storage
function setTempTextStorage(data) {
  eStore.set('attendeeTempText', data);
  localStorage.setItem('attendeeTempText', JSON.stringify(data));
}
// temp link storage
function setTempLinksStorage(data) {
  eStore.set('attendeeTempLinks', data);
  localStorage.setItem('attendeeTempLinks', JSON.stringify(data));
}

export {
    setTextStorage,
    setLinksStorage,
    setTempTextStorage,
    setTempLinksStorage,
};
