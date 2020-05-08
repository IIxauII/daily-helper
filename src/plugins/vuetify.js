import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#ee44aa',
        //secondary: '#424242',
        secondary: '#747474',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#fc0'
      },
      dark: {
        primary: '#ff9900',
        //secondary: '#747474',
        secondary: '#424242',
        //accent: '#9900FF',
        //accent: '#5cc8ff',
        accent: '#82B1FF',
        warning: '#fc0',
      },
    },
  },
});
